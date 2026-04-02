import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const titles = {
  '/dashboard': 'Dashboard',
  '/inventory':  'Inventario',
  '/pos':        'Punto de Venta',
  '/sales':      'Historial de Ventas',
  '/settings':   'Configuración',
};

export default function Header() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const title = titles[pathname] ?? 'AlaShop';

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="h-8 w-px bg-gray-100" />
        <span className="text-sm text-gray-500">{user?.full_name}</span>
      </div>
    </header>
  );
}
