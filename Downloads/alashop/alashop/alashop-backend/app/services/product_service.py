from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException, UploadFile
from app.models.product import Product, Category
from app.schemas.product import ProductCreate, ProductUpdate
import cloudinary
import cloudinary.uploader
from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)


def get_products(store_id: str, db: Session, search: str = None, category_id: str = None, low_stock: bool = False):
    query = db.query(Product).filter(Product.store_id == store_id, Product.is_active == True)
    if search:
        query = query.filter(
            or_(Product.name.ilike(f"%{search}%"), Product.barcode.ilike(f"%{search}%"))
        )
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if low_stock:
        query = query.filter(Product.stock <= Product.min_stock)
    return query.order_by(Product.name).all()


def get_product_by_barcode(store_id: str, barcode: str, db: Session) -> Product:
    product = db.query(Product).filter(
        Product.store_id == store_id,
        Product.barcode == barcode,
        Product.is_active == True,
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product


def create_product(store_id: str, data: ProductCreate, db: Session) -> Product:
    if data.barcode:
        existing = db.query(Product).filter(
            Product.store_id == store_id, Product.barcode == data.barcode
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="El código de barras ya existe")

    product = Product(store_id=store_id, **data.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(store_id: str, product_id: str, data: ProductUpdate, db: Session) -> Product:
    product = db.query(Product).filter(Product.id == product_id, Product.store_id == store_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


def upload_product_image(store_id: str, product_id: str, file: UploadFile, db: Session) -> str:
    product = db.query(Product).filter(Product.id == product_id, Product.store_id == store_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    result = cloudinary.uploader.upload(
        file.file,
        folder=f"alashop/{store_id}/products",
        public_id=str(product_id),
        overwrite=True,
        transformation=[{"width": 800, "height": 800, "crop": "limit", "quality": "auto"}],
    )
    product.image_url = result["secure_url"]
    db.commit()
    return product.image_url


def delete_product(store_id: str, product_id: str, db: Session) -> None:
    product = db.query(Product).filter(Product.id == product_id, Product.store_id == store_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    product.is_active = False
    db.commit()
