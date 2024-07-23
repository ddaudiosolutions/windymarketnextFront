import axios from 'axios';

const clienteAxios = axios.create({
  headers: {},
  baseURL: process.env.NEXT_BACKEND_URL,
});

export default clienteAxios;
