import axios from 'axios';

const clienteAxios = axios.create({
  headers: {},
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default clienteAxios;
