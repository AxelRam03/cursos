from fastapi import APIRouter, Depends, Query, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional, List
from app.core.database import get_db
from app.core.dependencies import get_current_user, require_admin, get_store_id
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.services import product_service
from app.models.user import User

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/", response_model=List[ProductResponse])
def list_products(
    search: Optional[str] = Query(None),
    category_id: Optional[str] = Query(None),
    low_stock: bool = Query(False),
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return product_service.get_products(store_id, db, search, category_id, low_stock)


@router.get("/barcode/{barcode}", response_model=ProductResponse)
def get_by_barcode(
    barcode: str,
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return product_service.get_product_by_barcode(store_id, barcode, db)


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(
    data: ProductCreate,
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    return product_service.create_product(store_id, data, db)


@router.patch("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: str,
    data: ProductUpdate,
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    return product_service.update_product(store_id, product_id, data, db)


@router.post("/{product_id}/image")
def upload_image(
    product_id: str,
    file: UploadFile = File(...),
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    url = product_service.upload_product_image(store_id, product_id, file, db)
    return {"image_url": url}


@router.delete("/{product_id}", status_code=204)
def delete_product(
    product_id: str,
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    product_service.delete_product(store_id, product_id, db)
