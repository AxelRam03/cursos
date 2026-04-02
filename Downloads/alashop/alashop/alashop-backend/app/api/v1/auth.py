from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.auth import StoreCreate, UserLogin, Token, PasswordResetRequest, PasswordReset, UserResponse
from app.services import auth_service
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=201)
def register(data: StoreCreate, db: Session = Depends(get_db)):
    return auth_service.register_store(data, db)


@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    return auth_service.login_user(data, db)


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "store_id": str(current_user.store_id),
    }


@router.post("/forgot-password", status_code=200)
def forgot_password(
    data: PasswordResetRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    background_tasks.add_task(auth_service.request_password_reset, data.email, db)
    return {"message": "Si el email existe, recibirás un correo con instrucciones"}


@router.post("/reset-password", status_code=200)
def reset_password(data: PasswordReset, db: Session = Depends(get_db)):
    auth_service.reset_password(data.token, data.new_password, db)
    return {"message": "Contraseña actualizada exitosamente"}
