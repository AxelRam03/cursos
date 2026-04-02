import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    store_name: '',
    store_email: '',
    full_name: '',
    email: '',
    password: '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.register(form);
      // get user info
      const meRes = await authApi.me();
      setAuth(meRes.data, data.access_token);
      toast.success('¡Tienda creada exitosamente!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg mb-4">
            <Store className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Crear tu tienda</h1>
          <p className="text-gray-500 text-sm mt-1">Empieza gratis, sin tarjeta</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de tu tienda</label>
              <input type="text" required value={form.store_name} onChange={set('store_name')}
                placeholder="Ej: Papelería La Esperanza" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email de la tienda</label>
              <input type="email" required value={form.store_email} onChange={set('store_email')}
                placeholder="contacto@mitienda.mx" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tu nombre completo</label>
              <input type="text" required value={form.full_name} onChange={set('full_name')}
                placeholder="María González" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tu correo de acceso</label>
              <input type="email" required value={form.email} onChange={set('email')}
                placeholder="tu@email.com" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
              <input type="password" required minLength={8} value={form.password} onChange={set('password')}
                placeholder="Mínimo 8 caracteres" className="input" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading && <Spinner size="sm" />}
              {loading ? 'Creando tienda…' : 'Crear mi tienda gratis'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-rose-600 font-medium hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
