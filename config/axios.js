import axios from 'axios';
import { getToken } from '../helpers/utils'; // Asegúrate de ajustar la ruta según sea necesario

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
