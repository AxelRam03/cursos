-- ============================================================
-- AlaShop — Script SQL Completo para PostgreSQL
-- Ejecutar: psql -U postgres -d alashop -f schema.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUMS ────────────────────────────────────────────────────
CREATE TYPE plan_type       AS ENUM ('free','basic','pro','enterprise');
CREATE TYPE user_role       AS ENUM ('admin','employee');
CREATE TYPE payment_method  AS ENUM ('cash','card','mercadopago','transfer');
CREATE TYPE sale_status     AS ENUM ('pending','completed','cancelled','refunded');
CREATE TYPE sub_status      AS ENUM ('active','cancelled','past_due','trialing');

-- ── STORES ───────────────────────────────────────────────────
CREATE TABLE stores (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(100) UNIQUE NOT NULL,
    email               VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    address             TEXT,
    logo_url            VARCHAR(500),
    plan                plan_type DEFAULT 'free',
    is_active           BOOLEAN DEFAULT true,
    stripe_customer_id  VARCHAR(255),
    mp_user_id          VARCHAR(255),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── USERS ────────────────────────────────────────────────────
CREATE TABLE users (
    id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id             UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    email                VARCHAR(255) UNIQUE NOT NULL,
    full_name            VARCHAR(255) NOT NULL,
    hashed_password      VARCHAR(255) NOT NULL,
    role                 user_role DEFAULT 'employee',
    is_active            BOOLEAN DEFAULT true,
    reset_token          VARCHAR(255),
    reset_token_expires  TIMESTAMPTZ,
    created_at           TIMESTAMPTZ DEFAULT NOW(),
    updated_at           TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_store ON users(store_id);
CREATE INDEX idx_users_email ON users(email);

-- ── CATEGORIES ───────────────────────────────────────────────
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id    UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_categories_store ON categories(store_id);

-- ── PRODUCTS ─────────────────────────────────────────────────
CREATE TABLE products (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id     UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    category_id  UUID REFERENCES categories(id) ON DELETE SET NULL,
    name         VARCHAR(255) NOT NULL,
    description  TEXT,
    barcode      VARCHAR(100),
    price        NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    cost_price   NUMERIC(12,2) DEFAULT 0 CHECK (cost_price >= 0),
    stock        INTEGER DEFAULT 0 CHECK (stock >= 0),
    min_stock    INTEGER DEFAULT 5,
    unit         VARCHAR(50) DEFAULT 'pieza',
    image_url    VARCHAR(500),
    is_active    BOOLEAN DEFAULT true,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_products_store_barcode ON products(store_id, barcode) WHERE barcode IS NOT NULL;
CREATE INDEX idx_products_store_active ON products(store_id, is_active);

-- ── SALES ────────────────────────────────────────────────────
CREATE TABLE sales (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id           UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    seller_id          UUID NOT NULL REFERENCES users(id),
    folio              VARCHAR(20) NOT NULL,
    subtotal           NUMERIC(12,2) NOT NULL,
    discount           NUMERIC(12,2) DEFAULT 0,
    tax                NUMERIC(12,2) DEFAULT 0,
    total              NUMERIC(12,2) NOT NULL,
    payment_method     payment_method NOT NULL,
    status             sale_status DEFAULT 'pending',
    notes              TEXT,
    payment_reference  VARCHAR(255),
    ticket_url         VARCHAR(500),
    created_at         TIMESTAMPTZ DEFAULT NOW(),
    updated_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_sales_store_folio ON sales(store_id, folio);
CREATE INDEX idx_sales_store_created ON sales(store_id, created_at DESC);

-- ── SALE ITEMS ───────────────────────────────────────────────
CREATE TABLE sale_items (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id          UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    product_id       UUID NOT NULL REFERENCES products(id),
    product_name     VARCHAR(255) NOT NULL,
    product_barcode  VARCHAR(100),
    unit_price       NUMERIC(12,2) NOT NULL,
    quantity         INTEGER NOT NULL CHECK (quantity > 0),
    subtotal         NUMERIC(12,2) NOT NULL
);
CREATE INDEX idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX idx_sale_items_product ON sale_items(product_id);

-- ── SUBSCRIPTIONS ────────────────────────────────────────────
CREATE TABLE subscriptions (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id                UUID NOT NULL REFERENCES stores(id),
    plan                    plan_type NOT NULL,
    status                  sub_status DEFAULT 'trialing',
    stripe_subscription_id  VARCHAR(255),
    mp_preapproval_id       VARCHAR(255),
    current_period_start    TIMESTAMPTZ,
    current_period_end      TIMESTAMPTZ,
    cancelled_at            TIMESTAMPTZ,
    created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ── TRIGGER updated_at ───────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_stores_upd   BEFORE UPDATE ON stores   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_upd    BEFORE UPDATE ON users    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_products_upd BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_sales_upd    BEFORE UPDATE ON sales    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── VISTA dashboard ──────────────────────────────────────────
CREATE VIEW v_store_daily_revenue AS
SELECT
    store_id,
    DATE(created_at)  AS sale_date,
    COUNT(*)          AS total_sales,
    SUM(total)        AS total_revenue,
    AVG(total)        AS avg_ticket
FROM sales
WHERE status = 'completed'
GROUP BY store_id, DATE(created_at);

-- ── DATOS DE PRUEBA ──────────────────────────────────────────
-- Contraseña del admin demo: Admin1234!
INSERT INTO stores (name, slug, email) VALUES ('Tienda Demo', 'tienda-demo', 'demo@alashop.mx');

INSERT INTO users (store_id, email, full_name, hashed_password, role)
SELECT id,
       'admin@demo.mx',
       'Admin Demo',
       '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
       'admin'
FROM stores WHERE slug = 'tienda-demo';
