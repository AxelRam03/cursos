import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  timeout: 15000,
});

// Inyectar token en cada request
client.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('alashop-auth');
    if (raw) {
      const state = JSON.parse(raw);
      const token = state?.state?.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

// Redirigir al login en 401
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('alashop-auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
