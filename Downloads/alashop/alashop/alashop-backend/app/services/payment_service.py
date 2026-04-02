import mercadopago
import stripe
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.core.config import settings
from app.models.sale import Sale, SaleStatus

stripe.api_key = settings.STRIPE_SECRET_KEY


def get_mp_sdk():
    return mercadopago.SDK(settings.MP_ACCESS_TOKEN)


def create_mp_preference(sale_id: str, total: float, description: str, store_id: str, db: Session) -> dict:
    sale = db.query(Sale).filter(Sale.id == sale_id, Sale.store_id == store_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Venta no encontrada")

    sdk = get_mp_sdk()
    preference_data = {
        "items": [{
            "id": str(sale.id),
            "title": description or f"Venta {sale.folio}",
            "quantity": 1,
            "unit_price": float(total),
            "currency_id": "MXN",
        }],
        "external_reference": str(sale.id),
        "back_urls": {
            "success": f"{settings.FRONTEND_URL}/pos?payment=success&sale={sale_id}",
            "failure": f"{settings.FRONTEND_URL}/pos?payment=failure",
            "pending": f"{settings.FRONTEND_URL}/pos?payment=pending",
        },
        "auto_return": "approved",
        "notification_url": f"{settings.BACKEND_URL}/api/v1/payments/mercadopago/webhook",
        "statement_descriptor": "ALASHOP",
    }

    result = sdk.preference().create(preference_data)
    if result["status"] != 201:
        raise HTTPException(status_code=400, detail="Error al crear preferencia de Mercado Pago")

    response = result["response"]
    return {
        "preference_id": response["id"],
        "init_point": response["init_point"],
        "sandbox_init_point": response.get("sandbox_init_point"),
    }


def handle_mp_webhook(payload: dict, db: Session) -> dict:
    if payload.get("type") == "payment":
        payment_id = payload.get("data", {}).get("id")
        if not payment_id:
            return {"status": "ignored"}

        sdk = get_mp_sdk()
        payment_info = sdk.payment().get(payment_id)
        payment_data = payment_info["response"]

        sale_id = payment_data.get("external_reference")
        status = payment_data.get("status")

        if sale_id and status == "approved":
            sale = db.query(Sale).filter(Sale.id == sale_id).first()
            if sale:
                sale.status = SaleStatus.COMPLETED
                sale.payment_reference = str(payment_id)
                db.commit()

    return {"status": "ok"}


def create_stripe_payment_intent(sale_id: str, amount_cents: int, store_id: str, db: Session) -> dict:
    sale = db.query(Sale).filter(Sale.id == sale_id, Sale.store_id == store_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Venta no encontrada")

    intent = stripe.PaymentIntent.create(
        amount=amount_cents,
        currency="mxn",
        metadata={"sale_id": str(sale_id), "store_id": str(store_id), "folio": sale.folio},
        description=f"AlaShop - Venta {sale.folio}",
    )
    return {"client_secret": intent.client_secret, "payment_intent_id": intent.id}


def handle_stripe_webhook(payload: bytes, signature: str, db: Session) -> dict:
    try:
        event = stripe.Webhook.construct_event(payload, signature, settings.STRIPE_WEBHOOK_SECRET)
    except Exception:
        raise HTTPException(status_code=400, detail="Webhook inválido")

    if event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]
        sale_id = intent["metadata"].get("sale_id")
        if sale_id:
            sale = db.query(Sale).filter(Sale.id == sale_id).first()
            if sale:
                sale.status = SaleStatus.COMPLETED
                sale.payment_reference = intent["id"]
                db.commit()

    return {"status": "ok"}
