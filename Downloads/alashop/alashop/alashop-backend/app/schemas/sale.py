from pydantic import BaseModel, validator
from typing import List, Optional
from enum import Enum


class PaymentMethodEnum(str, Enum):
    CASH = "cash"
    CARD = "card"
    MERCADOPAGO = "mercadopago"
    TRANSFER = "transfer"


class CartItem(BaseModel):
    product_id: str
    quantity: int

    @validator("quantity")
    def quantity_positive(cls, v):
        if v <= 0:
            raise ValueError("La cantidad debe ser mayor a 0")
        return v


class SaleCreate(BaseModel):
    items: List[CartItem]
    payment_method: PaymentMethodEnum
    discount: float = 0.0
    notes: Optional[str] = None


class SaleItemResponse(BaseModel):
    product_id: str
    product_name: str
    unit_price: float
    quantity: int
    subtotal: float

    class Config:
        from_attributes = True


class SaleResponse(BaseModel):
    id: str
    folio: str
    subtotal: float
    discount: float
    tax: float
    total: float
    payment_method: str
    status: str
    items: List[SaleItemResponse]
    ticket_url: Optional[str]

    class Config:
        from_attributes = True
