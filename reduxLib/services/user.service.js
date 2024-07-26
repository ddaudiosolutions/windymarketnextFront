import clienteAxios from '../../config/axios';


const registroUsuario = (newUserData) => {
  const { nombre, email, password } = newUserData;
  return clienteAxios.post('usuarios/newuser', { nombre, email, password });
};

/* const confirmarCuenta = (id) => {    
  return clienteAxios.post(`usuarios/confirmarcuenta/${id}`);
} */

const loginUsuarioActions = (userData) => {
  return clienteAxios.post('auth', userData);
};

// CARGAR DATOS DE USUARIO DESDE LA BB DE DATOS
const obtenerDatosUsuario = (userId) => {
  console.log('userId', userId);
  return clienteAxios.get(`usuarios/${userId}`);
};

// EDITAR USUARIO
const editarUsuario = (userData) => {
  return clienteAxios.put(`usuarios/editar/${userData.id}`, userData.formData);
};

// ELIMINAR USUARIO
const eliminarUsuario = (id) => {
  return clienteAxios.delete(`usuarios/${id}`);
};

// LOG-OUT USUARIO
const logoutUsuario = (nombreUser) => {
  return true;
};

/// AÑADIR PRODUCTO A FAVORITOS
const addFavoriteProduct = (productData) => {
  return clienteAxios.post('favoriteProducts/addFavorite', productData);
};

/// BORRAR PRODUCTO DE FAVORITOS DE UN USUARIO
const removeFavorite = (productId) => {
  return clienteAxios.post('favoriteProducts/removeFavorite', productId);
};

/// OBTENER LOS PRODUCTOS DE FAVORITOS DE UN USUARIO
const getFavoriteProducts = (favoriteProductsId) => {
  return clienteAxios.post('favoriteProducts/getFavorite', favoriteProductsId);
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
