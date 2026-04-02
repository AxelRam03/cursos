import { useState } from 'react';
import { X, Banknote, CreditCard, Smartphone, ArrowLeftRight } from 'lucide-react';
import { salesApi } from '../../api/sales';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

const methods = [
  { id: 'cash',         label: 'Efectivo',       icon: Banknote },
  { id: 'card',         label: 'Tarjeta',         icon: CreditCard },
  { id: 'mercadopago',  label: 'Mercado Pago',    icon: Smartphone },
  { id: 'transfer',     label: 'Transferencia',   icon: ArrowLeftRight },
];

export default function PaymentModal({ total, items, onClose, onSuccess }) {
  const [method,  setMethod]  = useState('cash');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await salesApi.create({
        items: items.map((i) => ({ product_id: i.product.id, quantity: i.quantity })),
        payment_method: method,
        discount: 0,
      });
      onSuccess(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al procesar la venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-base font-semibold text-gray-900">Método de pago</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-5">
          <div className="text-center">
            <p className="text-sm text-gray-400">Total a cobrar</p>
            <p className="text-4xl font-bold text-rose-600 mt-1">${total.toFixed(2)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {methods.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMethod(id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  method === id
                    ? 'border-rose-400 bg-rose-50 text-rose-600'
                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading && <Spinner size="sm" />}
            {loading ? 'Procesando…' : `Confirmar pago $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
