from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.dependencies import get_current_user, get_store_id
from app.models.sale import Sale, SaleItem, SaleStatus
from app.models.product import Product
from app.models.user import User
from datetime import datetime, timedelta

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary")
def get_summary(
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    today = datetime.utcnow().date()
    month_start = today.replace(day=1)

    today_sales = db.query(func.sum(Sale.total)).filter(
        Sale.store_id == store_id,
        Sale.status == SaleStatus.COMPLETED,
        func.date(Sale.created_at) == today,
    ).scalar() or 0

    month_sales = db.query(func.sum(Sale.total)).filter(
        Sale.store_id == store_id,
        Sale.status == SaleStatus.COMPLETED,
        Sale.created_at >= month_start,
    ).scalar() or 0

    month_count = db.query(func.count(Sale.id)).filter(
        Sale.store_id == store_id,
        Sale.status == SaleStatus.COMPLETED,
        Sale.created_at >= month_start,
    ).scalar() or 0

    low_stock = db.query(func.count(Product.id)).filter(
        Product.store_id == store_id,
        Product.is_active == True,
        Product.stock <= Product.min_stock,
    ).scalar() or 0

    top_products = db.query(
        Product.name,
        func.sum(SaleItem.quantity).label("total_qty"),
        func.sum(SaleItem.subtotal).label("total_revenue"),
    ).join(SaleItem, Product.id == SaleItem.product_id)\
     .join(Sale, SaleItem.sale_id == Sale.id)\
     .filter(
        Sale.store_id == store_id,
        Sale.status == SaleStatus.COMPLETED,
        Sale.created_at >= month_start,
    ).group_by(Product.id, Product.name)\
     .order_by(func.sum(SaleItem.quantity).desc())\
     .limit(5).all()

    daily_sales = db.query(
        func.date(Sale.created_at).label("date"),
        func.sum(Sale.total).label("total"),
        func.count(Sale.id).label("count"),
    ).filter(
        Sale.store_id == store_id,
        Sale.status == SaleStatus.COMPLETED,
        Sale.created_at >= datetime.utcnow() - timedelta(days=30),
    ).group_by(func.date(Sale.created_at))\
     .order_by(func.date(Sale.created_at)).all()

    return {
        "today_revenue": round(float(today_sales), 2),
        "month_revenue": round(float(month_sales), 2),
        "month_sales_count": month_count,
        "low_stock_count": low_stock,
        "top_products": [
            {"name": p.name, "quantity": int(p.total_qty), "revenue": round(float(p.total_revenue), 2)}
            for p in top_products
        ],
        "daily_sales": [
            {"date": str(d.date), "total": round(float(d.total), 2), "count": d.count}
            for d in daily_sales
        ],
    }
