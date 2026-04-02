import { useEffect, useState } from 'react';
import { Download, FileText, Search } from 'lucide-react';
import { salesApi } from '../api/sales';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const statusVariant = { completed: 'green', pending: 'amber', cancelled: 'red', refunded: 'blue' };
const statusLabel   = { completed: 'Completada', pending: 'Pendiente', cancelled: 'Cancelada', refunded: 'Reembolsada' };
const methodLabel   = { cash: 'Efectivo', card: 'Tarjeta', mercadopago: 'Mercado Pago', transfer: 'Transferencia' };

const fmt = (n) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);

export default function Sales() {
  const { isAdmin } = useAuthStore();
  const [sales,   setSales]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [page,    setPage]    = useState(1);
  const [filters, setFilters] = useState({ start_date: '', end_date: '' });
  const [exporting, setExporting] = useState(false);

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const params = { page: p, page_size: 20 };
      if (filters.start_date) params.start_date = filters.start_date;
      if (filters.end_date)   params.end_date   = filters.end_date;
      const { data } = await salesApi.list(params);
      setSales(data.sales);
      setTotal(data.total);
      setPage(p);
    } catch {
      toast.error('Error al cargar historial');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); }, []); // eslint-disable-line

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = {};
      if (filters.start_date) params.start_date = filters.start_date;
      if (filters.end_date)   params.end_date   = filters.end_date;
      const { data } = await salesApi.exportExcel(params);
      const url = URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a');
      a.href = url; a.download = 'ventas.xlsx'; a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Error al exportar');
    } finally {
      setExporting(false);
    }
  };

  const pages = Math.ceil(total / 20);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Desde</label>
          <input type="date" className="input w-40"
            value={filters.start_date}
            onChange={(e) => setFilters((f) => ({ ...f, start_date: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Hasta</label>
          <input type="date" className="input w-40"
            value={filters.end_date}
            onChange={(e) => setFilters((f) => ({ ...f, end_date: e.target.value }))} />
        </div>
        <button onClick={() => load(1)} className="btn-secondary">
          <Search className="w-4 h-4" />
          Filtrar
        </button>
        {isAdmin() && (
          <button onClick={handleExport} disabled={exporting} className="btn-secondary ml-auto">
            {exporting ? <Spinner size="sm" /> : <Download className="w-4 h-4" />}
            Exportar Excel
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {['Folio', 'Fecha', 'Vendedor', 'Productos', 'Total', 'Método', 'Estado', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sales.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400 text-sm">Sin ventas en el período seleccionado</td></tr>
                )}
                {sales.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700">{s.folio}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(s.created_at).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{s.seller?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{s.items?.length ?? 0}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{fmt(s.total)}</td>
                    <td className="px-4 py-3 text-gray-500">{methodLabel[s.payment_method] ?? s.payment_method}</td>
                    <td className="px-4 py-3">
                      <Badge label={statusLabel[s.status] ?? s.status} variant={statusVariant[s.status] ?? 'gray'} />
                    </td>
                    <td className="px-4 py-3">
                      {s.ticket_url && (
                        <a href={s.ticket_url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-rose-600 hover:underline">
                          <FileText className="w-3.5 h-3.5" />
                          Ticket
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">{total} ventas en total</span>
              <div className="flex gap-2">
                <button onClick={() => load(page - 1)} disabled={page === 1}
                  className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-40">Anterior</button>
                <span className="text-xs text-gray-500 flex items-center">{page} / {pages}</span>
                <button onClick={() => load(page + 1)} disabled={page === pages}
                  className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-40">Siguiente</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
