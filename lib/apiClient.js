import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/',
});

let getToken = () => null;

export const injectTokenGetter = (fn) => {
  getToken = fn;
};

apiClient.interceptors.request.use((config) => {
  const token = getToken?.();
  if (token) config.headers['x-auth-token'] = token;
  return config;
});

export default apiClient;
