from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.sale import Sale, SaleItem, SaleStatus
from app.models.product import Product
from app.schemas.sale import SaleCreate
from datetime import datetime


def generate_folio(store_id: str, db: Session) -> str:
    count = db.query(Sale).filter(Sale.store_id == store_id).count()
    return f"VTA-{(count + 1):06d}"


def create_sale(store_id: str, seller_id: str, data: SaleCreate, db: Session) -> Sale:
    sale_items = []
    subtotal = 0.0

    for cart_item in data.items:
        product = db.query(Product).filter(
            Product.id == cart_item.product_id,
            Product.store_id == store_id,
            Product.is_active == True,
        ).first()

        if not product:
            raise HTTPException(status_code=404, detail=f"Producto {cart_item.product_id} no encontrado")
        if product.stock < cart_item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para '{product.name}'. Disponible: {product.stock}",
            )

        item_subtotal = product.price * cart_item.quantity
        subtotal += item_subtotal
        sale_items.append({
            "product": product,
            "quantity": cart_item.quantity,
            "unit_price": product.price,
            "subtotal": item_subtotal,
        })

    discount = data.discount
    tax = round((subtotal - discount) * 0.16, 2)
    total = subtotal - discount + tax

    sale = Sale(
        store_id=store_id,
        seller_id=seller_id,
        folio=generate_folio(store_id, db),
        subtotal=subtotal,
        discount=discount,
        tax=tax,
        total=total,
        payment_method=data.payment_method,
        status=SaleStatus.COMPLETED if data.payment_method == "cash" else SaleStatus.PENDING,
        notes=data.notes,
    )
    db.add(sale)
    db.flush()

    for item_data in sale_items:
        db.add(SaleItem(
            sale_id=sale.id,
            product_id=item_data["product"].id,
            product_name=item_data["product"].name,
            product_barcode=item_data["product"].barcode,
            unit_price=item_data["unit_price"],
            quantity=item_data["quantity"],
            subtotal=item_data["subtotal"],
        ))
        item_data["product"].stock -= item_data["quantity"]

    db.commit()
    db.refresh(sale)
    return sale


def get_sales_history(
    store_id: str, db: Session,
    start_date=None, end_date=None,
    page: int = 1, page_size: int = 20,
) -> dict:
    query = db.query(Sale).filter(Sale.store_id == store_id)
    if start_date:
        query = query.filter(Sale.created_at >= start_date)
    if end_date:
        query = query.filter(Sale.created_at <= end_date)

    total = query.count()
    sales = query.order_by(Sale.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return {"total": total, "page": page, "page_size": page_size, "sales": sales}
