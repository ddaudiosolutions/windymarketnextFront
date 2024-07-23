import axios from 'axios';

const clienteAxios = axios.create({
  headers: {},
  baseURL: 'http://localhost:4000/api/',
});

export default clienteAxios;
