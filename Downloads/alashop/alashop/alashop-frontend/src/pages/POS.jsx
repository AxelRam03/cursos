import { useState, useCallback } from 'react';
import { Search, Scan, Trash2, Plus, Minus, CreditCard, ShoppingCart, Package } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { productsApi } from '../api/products';
import BarcodeScanner from '../components/pos/BarcodeScanner';
import PaymentModal from '../components/pos/PaymentModal';
import toast from 'react-hot-toast';

const fmt = (n) => `$${n.toFixed(2)}`;

export default function POS() {
  const [search,      setSearch]      = useState('');
  const [products,    setProducts]    = useState([]);
  const [scanning,    setScanning]    = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [lastSale,    setLastSale]    = useState(null);

  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal, getCount } = useCartStore();

  const searchProducts = useCallback(async (q) => {
    if (!q.trim()) { setProducts([]); return; }
    try {
      const { data } = await productsApi.list({ search: q });
      setProducts(data);
    } catch {
      setProducts([]);
    }
  }, []);

  const handleBarcodeDetect = async (barcode) => {
    try {
      const { data } = await productsApi.getByBarcode(barcode);
      addItem(data);
      toast.success(`${data.name} agregado`);
      setScanning(false);
    } catch {
      toast.error('Producto no encontrado');
    }
  };

  const handleAddProduct = (product) => {
    try {
      addItem(product);
      toast.success(`${product.name} agregado`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const subtotal = getTotal();
  const tax      = subtotal * 0.16;
  const total    = subtotal + tax;

  return (
    <div className="flex gap-5 h-[calc(100vh-8rem)]">
      {/* ── Left: product search ────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Search bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input pl-9"
              placeholder="Buscar producto por nombre o código…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchProducts(e.target.value);
              }}
            />
          </div>
          <button onClick={() => setScanning(true)} className="btn-primary shrink-0">
            <Scan className="w-4 h-4" />
            Escanear
          </button>
        </div>

        {/* Product grid */}
        <div className="flex-1 overflow-y-auto">
          {products.length === 0 && search && (
            <div className="flex flex-col items-center py-12 text-gray-400">
              <Package className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">Sin resultados para "{search}"</p>
            </div>
          )}
          {products.length === 0 && !search && (
            <div className="flex flex-col items-center py-16 text-gray-300">
              <Search className="w-12 h-12 mb-3" />
              <p className="text-sm">Busca un producto o escanea el código</p>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => handleAddProduct(p)}
                disabled={p.stock === 0}
                className="card p-4 text-left hover:border-rose-200 hover:shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-full h-20 object-cover rounded-lg mb-3" />
                ) : (
                  <div className="w-full h-20 rounded-lg bg-rose-50 flex items-center justify-center mb-3">
                    <Package className="w-8 h-8 text-rose-200" />
                  </div>
                )}
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Stock: {p.stock}</p>
                <p className="text-rose-600 font-bold text-sm mt-1">{fmt(p.price)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: cart ─────────────────────────────────── */}
      <div className="w-80 card flex flex-col shrink-0">
        {/* Cart header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-rose-500" />
            <h2 className="font-semibold text-gray-900">Carrito</h2>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
              Limpiar
            </button>
          )}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && (
            <div className="flex flex-col items-center py-10 text-gray-300">
              <ShoppingCart className="w-12 h-12 mb-2" />
              <p className="text-sm">Carrito vacío</p>
            </div>
          )}
          {items.map(({ product: p, quantity }) => (
            <div key={p.id} className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-tight truncate">{p.name}</p>
                <p className="text-xs text-rose-500 mt-0.5">{fmt(p.price)} c/u</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => updateQuantity(p.id, quantity - 1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(p.id, quantity + 1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeItem(p.id)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>IVA (16%)</span><span>{fmt(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
            <span>Total</span>
            <span className="text-rose-600 text-lg">{fmt(total)}</span>
          </div>

          <button
            onClick={() => items.length > 0 && setPaymentOpen(true)}
            disabled={items.length === 0}
            className="btn-primary w-full mt-1"
          >
            <CreditCard className="w-4 h-4" />
            Cobrar {fmt(total)}
          </button>
        </div>
      </div>

      {/* Modals */}
      {scanning && (
        <BarcodeScanner
          onDetected={handleBarcodeDetect}
          onClose={() => setScanning(false)}
        />
      )}

      {paymentOpen && (
        <PaymentModal
          total={total}
          items={items}
          onClose={() => setPaymentOpen(false)}
          onSuccess={(sale) => {
            setLastSale(sale);
            clearCart();
            setPaymentOpen(false);
            toast.success(`✅ Venta ${sale.folio} completada`);
          }}
        />
      )}

      {/* Ticket success banner */}
      {lastSale && (
        <div className="fixed bottom-6 right-6 card p-4 shadow-lg border-rose-100 flex items-center gap-4 z-40">
          <div>
            <p className="text-sm font-semibold text-gray-900">Venta {lastSale.folio}</p>
            <p className="text-xs text-gray-400">Total: ${lastSale.total?.toFixed(2)}</p>
          </div>
          {lastSale.ticket_url && (
            <a
              href={lastSale.ticket_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-rose-600 font-medium hover:underline"
            >
              Ver ticket
            </a>
          )}
          <button onClick={() => setLastSale(null)} className="text-gray-300 hover:text-gray-500 ml-2">✕</button>
        </div>
      )}
    </div>
  );
}
