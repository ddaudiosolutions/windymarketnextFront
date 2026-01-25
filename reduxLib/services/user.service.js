import clienteAxios from '../../config/axios';
import { getAuthHeaders } from '@/helpers/utils';
/* const user = sessionStorage.getItem('userToken'); */
let data = {
  headers: {
    'x-auth-token': 'user',
  },
  // body: {imagenData},
};

const registroUsuario = (newUserData) => {
  const { nombre, email, password } = newUserData;
  return clienteAxios.post('usuarios/newuser', { nombre, email, password });
};

/* const confirmarCuenta = (id) => {    
  return clienteAxios.post(`usuarios/confirmarcuenta/${id}`);
} */

const loginUsuarioActions = (userData) => {
  return clienteAxios.post('auth', userData, data);
};

// CARGAR DATOS DE USUARIO DESDE LA BB DE DATOS
const obtenerDatosUsuario = (userId) => {

  if (userId !== null) {
    data = {
      headers: {
        'x-auth-token': sessionStorage.getItem('userToken'),
      },
      // body: {imagenData},
    };
    return clienteAxios.get(`usuarios/${userId}`, getAuthHeaders());
  }
  return clienteAxios.get(`usuarios/${userId}`, getAuthHeaders());
};

// EDITAR USUARIO
const editarUsuario = (userData) => {
  return clienteAxios.put(`usuarios/editar/${userData.id}`, userData.formData, getAuthHeaders());
};

// ELIMINAR USUARIO
const eliminarUsuario = (id) => {
  return clienteAxios.delete(`usuarios/${id}`, getAuthHeaders());
};

// LOG-OUT USUARIO
const logoutUsuario = (nombreUser) => {
  return true;
};

/// AÑADIR PRODUCTO A FAVORITOS
const addFavoriteProduct = (productData) => {
  return clienteAxios.post('favoriteProducts/addFavorite', productData, getAuthHeaders());
};

/// BORRAR PRODUCTO DE FAVORITOS DE UN USUARIO
const removeFavorite = (productId) => {
  return clienteAxios.post('favoriteProducts/removeFavorite', productId, getAuthHeaders());
};

/// OBTENER LOS PRODUCTOS DE FAVORITOS DE UN USUARIO
const getFavoriteProducts = (favoriteProductsId) => {
  return clienteAxios.post('favoriteProducts/getFavorite', favoriteProductsId, getAuthHeaders());
};

// Enviar email interes por producto entre users
const sendMailToUser = (emailData) => {
  return clienteAxios.post('usuarios/correoentreusuarios', emailData);
};

const UsersService = {
  sendMailToUser,
  obtenerDatosUsuario,
  editarUsuario,
  eliminarUsuario,
  registroUsuario,
  logoutUsuario,
  loginUsuarioActions,
  addFavoriteProduct,
  removeFavorite,
  getFavoriteProducts,
};

export default UsersService;
