from pydantic import BaseModel, validator
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    barcode: Optional[str] = None
    price: float
    cost_price: Optional[float] = 0.0
    stock: int = 0
    min_stock: int = 5
    unit: str = "pieza"
    category_id: Optional[str] = None

    @validator("price")
    def price_positive(cls, v):
        if v <= 0:
            raise ValueError("El precio debe ser mayor a 0")
        return v


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    barcode: Optional[str] = None
    price: Optional[float] = None
    cost_price: Optional[float] = None
    stock: Optional[int] = None
    min_stock: Optional[int] = None
    unit: Optional[str] = None
    category_id: Optional[str] = None
    is_active: Optional[bool] = None


class ProductResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    barcode: Optional[str]
    price: float
    cost_price: float
    stock: int
    min_stock: int
    unit: str
    image_url: Optional[str]
    is_active: bool
    category_id: Optional[str]
    low_stock: bool = False

    @validator("low_stock", pre=True, always=True)
    def compute_low_stock(cls, v, values):
        return values.get("stock", 0) <= values.get("min_stock", 5)

    class Config:
        from_attributes = True
