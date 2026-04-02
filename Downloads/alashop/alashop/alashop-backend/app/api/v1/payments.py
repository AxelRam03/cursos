from fastapi import APIRouter, Depends, Request, Header
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user, get_store_id
from app.models.user import User
from app.services.payment_service import (
    create_mp_preference, create_stripe_payment_intent,
    handle_mp_webhook, handle_stripe_webhook,
)
from pydantic import BaseModel

router = APIRouter(prefix="/payments", tags=["Payments"])


class MPPaymentRequest(BaseModel):
    sale_id: str
    total: float
    description: str = ""


class StripePaymentRequest(BaseModel):
    sale_id: str
    amount_cents: int


@router.post("/mercadopago/create-preference")
def mp_create_preference(
    data: MPPaymentRequest,
    current_user: User = Depends(get_current_user),
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
):
    return create_mp_preference(data.sale_id, data.total, data.description, store_id, db)


@router.post("/mercadopago/webhook")
async def mp_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.json()
    return handle_mp_webhook(payload, db)


@router.post("/stripe/create-intent")
def stripe_create_intent(
    data: StripePaymentRequest,
    current_user: User = Depends(get_current_user),
    store_id: str = Depends(get_store_id),
    db: Session = Depends(get_db),
):
    return create_stripe_payment_intent(data.sale_id, data.amount_cents, store_id, db)


@router.post("/stripe/webhook")
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None),
    db: Session = Depends(get_db),
):
    payload = await request.body()
    return handle_stripe_webhook(payload, stripe_signature, db)
