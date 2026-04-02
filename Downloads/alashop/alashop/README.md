# 🏪 AlaShop — Sistema de Gestión de Inventario y Ventas

Sistema web completo (SaaS) para gestión de inventario y punto de venta.

---

## 📁 Estructura

```
alashop/
├── alashop-backend/   → FastAPI + PostgreSQL
└── alashop-frontend/  → React + Vite + Tailwind CSS
```

---

## 🚀 Inicio rápido (local)

### Backend

```bash
cd alashop-backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Edita las variables
# Crea la base de datos PostgreSQL y ejecuta:
psql -U postgres -d alashop -f schema.sql
uvicorn app.main:app --reload
# API docs: http://localhost:8000/api/docs
```

### Frontend

```bash
cd alashop-frontend
npm install
cp .env.example .env            # Edita VITE_API_URL
npm run dev
# App: http://localhost:5173
```

---

## ⚙️ Variables de entorno

### Backend `.env`
| Variable | Descripción |
|---|---|
| `SECRET_KEY` | Clave JWT (genera con `openssl rand -hex 32`) |
| `DATABASE_URL` | URL PostgreSQL |
| `CLOUDINARY_*` | Credenciales Cloudinary para imágenes |
| `MP_ACCESS_TOKEN` | Token Mercado Pago producción |
| `STRIPE_SECRET_KEY` | Clave secreta Stripe |
| `SMTP_*` | Credenciales email |

### Frontend `.env`
| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend (`https://api.alashop.mx/api/v1`) |
| `VITE_MP_PUBLIC_KEY` | Public key Mercado Pago |

---

## 🌐 Deploy

### Backend → Railway
```bash
npm install -g @railway/cli
railway login
cd alashop-backend
railway init
railway add --plugin postgresql
# Configura variables de entorno en Railway Dashboard
railway up
```

### Frontend → Vercel
```bash
npm install -g vercel
cd alashop-frontend
npm run build
vercel --prod
# Agrega VITE_API_URL en Vercel Dashboard → Settings → Environment Variables
```

---

## 🔑 Usuario demo
- Email: `admin@demo.mx`
- Contraseña: `Admin1234!`

---

## 📦 Stack
- **Backend:** Python 3.12, FastAPI, SQLAlchemy, PostgreSQL, JWT
- **Frontend:** React 18, Vite, Tailwind CSS, Zustand, Recharts
- **Pagos:** Mercado Pago, Stripe
- **Imágenes:** Cloudinary
- **PWA:** Service Worker + manifest.json

---

## 🏗️ Arquitectura Multi-Tenant
Cada tienda tiene un `store_id` único. Todos los modelos incluyen
`store_id` como FK. El middleware de dependencias en FastAPI garantiza
aislamiento total de datos entre tiendas.

---

## 📄 Licencia
MIT — libre para uso comercial y personal.
