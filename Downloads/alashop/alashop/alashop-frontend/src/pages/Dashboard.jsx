import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, ShoppingCart, AlertTriangle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';
import { dashboardApi } from '../api/dashboard';
import StatCard from '../components/dashboard/StatCard';
import Spinner from '../components/ui/Spinner';

const fmt = (n) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);

export default function Dashboard() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.summary()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Ventas Hoy"       value={fmt(data?.today_revenue ?? 0)}       icon={TrendingUp}    color="rose" />
        <StatCard title="Ingresos del Mes" value={fmt(data?.month_revenue ?? 0)}       icon={ShoppingBag}   color="pink" />
        <StatCard title="Ventas del Mes"   value={data?.month_sales_count ?? 0}        icon={ShoppingCart}  color="purple" />
        <StatCard
          title="Stock Bajo"
          value={data?.low_stock_count ?? 0}
          icon={AlertTriangle}
          color="amber"
          alert={(data?.low_stock_count ?? 0) > 0}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line chart */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            Ventas — últimos 30 días
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data?.daily_sales ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v) => [fmt(v), 'Total']}
                labelFormatter={(l) => `Fecha: ${l}`}
                contentStyle={{ borderRadius: 12, border: '1px solid #f3f4f6', fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#f43f5e"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#f43f5e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top products */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            Top productos del mes
          </h2>
          {data?.top_products?.length ? (
            <div className="space-y-4">
              {data.top_products.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.quantity} unidades</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    {fmt(p.revenue)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center mt-8">
              Aún no hay ventas este mes
            </p>
          )}
        </div>
      </div>

      {/* Bar chart */}
      {(data?.daily_sales?.length ?? 0) > 0 && (
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            Número de ventas diarias
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.daily_sales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="count" fill="#fda4af" radius={[4, 4, 0, 0]} name="Ventas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
