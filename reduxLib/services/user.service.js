import apiClient from '@/lib/apiClient';

const registroUsuario = (newUserData) => {
  const { nombre, email, password } = newUserData;
  return apiClient.post('usuarios/newuser', { nombre, email, password });
};

/* const confirmarCuenta = (id) => {    
  return apiClient.post(`usuarios/confirmarcuenta/${id}`);
} */

const loginUsuarioActions = (userData) => {
  return apiClient.post('auth', userData);
};

// CARGAR DATOS DE USUARIO DESDE LA BB DE DATOS
const obtenerDatosUsuario = (userId) => {
  if (!userId) return Promise.reject('No userId');
  return apiClient.get(`usuarios/${userId}`);
};

// EDITAR USUARIO
const editarUsuario = (userData) => {
  return apiClient.put(`usuarios/editar/${userData.id}`, userData.formData);
};

// ELIMINAR USUARIO
const eliminarUsuario = (id) => {
  return apiClient.delete(`usuarios/${id}`);
};

// LOG-OUT USUARIO
const logoutUsuario = (nombreUser) => {
  return true;
};

/// AÑADIR PRODUCTO A FAVORITOS
const addFavoriteProduct = (productData) => {
  return apiClient.post('favoriteProducts/addFavorite', productData);
};

/// BORRAR PRODUCTO DE FAVORITOS DE UN USUARIO
const removeFavorite = (productId) => {
  return apiClient.post('favoriteProducts/removeFavorite', productId);
};

/// OBTENER LOS PRODUCTOS DE FAVORITOS DE UN USUARIO
const getFavoriteProducts = (favoriteProductsId) => {
  return apiClient.post('favoriteProducts/getFavorite', favoriteProductsId);
};

// Enviar email interes por producto entre users
const sendMailToUser = (emailData) => {
  return apiClient.post('usuarios/correoentreusuarios', emailData);
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
