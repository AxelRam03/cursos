from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
import io
from app.core.database import get_db
from app.core.dependencies import get_current_user, require_admin, get_store_id
from app.schemas.sale import SaleCreate, SaleResponse
from app.services import sale_service, export_service
from app.models.user import User

router = APIRouter(prefix="/sales", tags=["Sales"])


@router.post("/", response_model=SaleResponse, status_code=201)
def create_sale(
    data: SaleCreate,
    current_user: User = Depends(get_current_user),
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
):
    return sale_service.create_sale(store_id, str(current_user.id), data, db)


@router.get("/")
def list_sales(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    start = datetime.fromisoformat(start_date) if start_date else None
    end = datetime.fromisoformat(end_date) if end_date else None
    return sale_service.get_sales_history(store_id, db, start, end, page, page_size)


@router.get("/export/excel")
def export_excel(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    store_id: str = Depends(get_store_id),
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    start = datetime.fromisoformat(start_date) if start_date else None
    end = datetime.fromisoformat(end_date) if end_date else None
    result = sale_service.get_sales_history(store_id, db, start, end, page=1, page_size=10000)
    store_name = current_user.store.name if current_user.store else "AlaShop"
    excel_bytes = export_service.generate_sales_excel(result["sales"], store_name)
    return StreamingResponse(
        io.BytesIO(excel_bytes),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=ventas.xlsx"},
    )


@router.get("/export/ticket/{sale_id}")
def export_ticket(
    sale_id: str,
    store_id: str = Depends(get_store_id),
    _: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    from app.models.sale import Sale
    sale = db.query(Sale).filter(Sale.id == sale_id, Sale.store_id == store_id).first()
    if not sale:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Venta no encontrada")

    pdf_bytes = export_service.generate_ticket_pdf_bytes(sale)
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"inline; filename=ticket-{sale.folio}.pdf"},
    )
