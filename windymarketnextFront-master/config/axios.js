import axios from 'axios';
import { getToken } from '../helpers/utils';

// Validar que la URL del backend esté configurada
if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL no está configurada en las variables de entorno');
}

const clienteAxios = axios.create({
  headers: {},
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Interceptor para agregar el token de autenticación en cada solicitud
clienteAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clienteAxios;
