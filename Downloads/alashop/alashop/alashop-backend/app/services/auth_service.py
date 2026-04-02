import secrets
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user import User, UserRole
from app.models.store import Store
from app.core.security import (
    verify_password, get_password_hash,
    create_access_token, create_refresh_token,
)
from app.schemas.auth import StoreCreate, UserLogin
import re


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text


def register_store(data: StoreCreate, db: Session) -> dict:
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    slug = slugify(data.store_name)
    base_slug = slug
    counter = 1
    while db.query(Store).filter(Store.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    store = Store(name=data.store_name, slug=slug, email=data.store_email)
    db.add(store)
    db.flush()

    user = User(
        store_id=store.id,
        email=data.email,
        full_name=data.full_name,
        hashed_password=get_password_hash(data.password),
        role=UserRole.ADMIN,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "access_token": create_access_token(str(user.id)),
        "refresh_token": create_refresh_token(str(user.id)),
        "token_type": "bearer",
    }


def login_user(data: UserLogin, db: Session) -> dict:
    user = db.query(User).filter(User.email == data.email, User.is_active == True).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {
        "access_token": create_access_token(str(user.id)),
        "refresh_token": create_refresh_token(str(user.id)),
        "token_type": "bearer",
    }


def request_password_reset(email: str, db: Session) -> None:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return

    token = secrets.token_urlsafe(32)
    user.reset_token = token
    user.reset_token_expires = datetime.utcnow() + timedelta(hours=2)
    db.commit()

    # send_reset_email(email=user.email, name=user.full_name, token=token)
    print(f"[RESET TOKEN] {token}")  # Reemplazar con email real


def reset_password(token: str, new_password: str, db: Session) -> None:
    user = db.query(User).filter(
        User.reset_token == token,
        User.reset_token_expires > datetime.utcnow(),
    ).first()

    if not user:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")

    user.hashed_password = get_password_hash(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
