import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Pencil, Trash2, AlertTriangle, Package } from 'lucide-react';
import { productsApi } from '../api/products';
import ProductModal from '../components/inventory/ProductModal';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function Inventory() {
  const { isAdmin } = useAuthStore();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [lowStock, setLowStock]   = useState(false);
  const [modal, setModal]         = useState(null); // null | 'create' | product obj

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await productsApi.list({ search: search || undefined, low_stock: lowStock || undefined });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }, [search, lowStock]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (p) => {
    if (!confirm(`¿Eliminar "${p.name}"?`)) return;
    try {
      await productsApi.delete(p.id);
      toast.success('Producto eliminado');
      load();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Buscar por nombre o código…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={lowStock}
            onChange={(e) => setLowStock(e.target.checked)}
            className="accent-rose-500"
          />
          Solo stock bajo
        </label>

        {isAdmin() && (
          <button onClick={() => setModal('create')} className="btn-primary shrink-0">
            <Plus className="w-4 h-4" />
            Nuevo producto
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : products.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-gray-400">
          <Package className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">No hay productos</p>
          {isAdmin() && (
            <button onClick={() => setModal('create')} className="btn-primary mt-4 text-sm">
              <Plus className="w-4 h-4" /> Agregar el primero
            </button>
          )}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {['Producto', 'Código', 'Precio', 'Stock', 'Estado', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-rose-300" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{p.name}</p>
                          {p.description && (
                            <p className="text-xs text-gray-400 truncate max-w-[180px]">{p.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.barcode || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${p.low_stock ? 'text-amber-600' : 'text-gray-700'}`}>
                        {p.stock}
                        {p.low_stock && <AlertTriangle className="inline w-3.5 h-3.5 ml-1 text-amber-500" />}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={p.low_stock ? 'Stock bajo' : 'Normal'}
                        variant={p.low_stock ? 'amber' : 'green'}
                      />
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin() && (
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => setModal(p)}
                            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && (
        <ProductModal
          product={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}
