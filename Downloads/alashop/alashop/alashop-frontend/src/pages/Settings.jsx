import { useAuthStore } from '../store/authStore';

export default function Settings() {
  const { user, isAdmin } = useAuthStore();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Mi cuenta</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Nombre</span>
            <span className="font-medium text-gray-900">{user?.full_name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Correo</span>
            <span className="font-medium text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Rol</span>
            <span className="capitalize font-medium text-gray-900">{user?.role}</span>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Plan actual</h2>
        <p className="text-sm text-gray-500 mb-4">
          Estás usando el plan <span className="font-semibold text-rose-600">Gratuito</span>.
          Actualiza para acceder a más funciones.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Gratis',  price: '$0',    features: ['50 productos', '1 usuario', '100 ventas/mes'] },
            { name: 'Básico',  price: '$299',  features: ['500 productos', '3 usuarios', 'Reportes Excel/PDF'], popular: true },
            { name: 'Pro',     price: '$699',  features: ['Ilimitado', 'Usuarios ilimitados', '3 sucursales'] },
          ].map((plan) => (
            <div key={plan.name}
              className={`rounded-xl p-4 border-2 ${plan.popular ? 'border-rose-400 bg-rose-50' : 'border-gray-100'}`}>
              {plan.popular && (
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">Recomendado</span>
              )}
              <p className="text-base font-bold text-gray-900 mt-1">{plan.name}</p>
              <p className="text-2xl font-black text-gray-900">{plan.price}<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="mt-3 space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-rose-400 mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                plan.popular
                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {plan.name === 'Gratis' ? 'Plan actual' : 'Elegir plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Acerca de AlaShop</h2>
        <p className="text-sm text-gray-500">Versión 1.0.0 — Sistema de gestión de inventario y ventas.</p>
        <p className="text-sm text-gray-500 mt-1">
          Documentación en{' '}
          <a href="https://docs.alashop.mx" className="text-rose-600 hover:underline" target="_blank" rel="noreferrer">
            docs.alashop.mx
          </a>
        </p>
      </div>
    </div>
  );
}
