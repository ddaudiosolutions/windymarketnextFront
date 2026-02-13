import apiClient from '@/lib/apiClient';
/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREAR NUEVOS PRODUCTOS
const crearNuevoProductoAction = (producto, history) => {
  return apiClient.post('productos/newproduct', producto);
};

// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
const obtenerCategoriaActions = (pageAndData) => {
  const { busquedaquery, pagequery } = pageAndData;
  return apiClient.get(`productos?busqueda=${busquedaquery}&page=${pagequery}`);
};

// DESCARGAR PRODUCTOS USUARIO

const obtenerNumeroVistasProducto = (productoId) => {
  return apiClient.post(`productos/getViewsProduct`, { productId: productoId });
};

const obtenerProductosMasVistos = () => {
  /*  console.log('entrando en mostviewed FRONT'); */
  return apiClient.get(`productos/mostviewedProducts`);
};

const obtenerProductosUser = (pageNuser) => {
  return apiClient.get(`productos/user?=${pageNuser}`);
};

const obtenerProductoIdApi = (productoid) => {
  return apiClient.get(`productos/${productoid}`);
};

const obtenerProductosPorPalabras = (words) => {
  return apiClient.post(`productos/searchByWords`, words);
};

// SELECCIONAR Y ELIMINAR PRODUCTO
const borrarProducto = (id) => {
  return apiClient.delete(`productos/user/${id}`);
};

/// ///////////////////////////////////////////////
// EDITAR EL PRODUCTO /////
const editarProducto = (productData) => {
  const { formData, id } = productData;
  return apiClient.put(`productos/user/editar/${id}`, formData);
};

/// ////////////////////
// DESCARGAR TODOS LOS PRODUCTOS DE UN USUARIO
/// //////
const obtenerProductosAuthor = (authorId) => {
  return apiClient.get(`productos/auth/${authorId}`);
};

const sendMailPegatinas = (emailData) => {
  return apiClient.post('productos/envioPegatinas', emailData);
};

const editReservedState = (stateData) => {
  return apiClient.post('productos/editReservedState', stateData);
};
const editVendidoState = (stateData) => {
  return apiClient.post('productos/editVendidoState', stateData);
};

const reactivarProducto = (productoId) => {
  return apiClient.post('productos/reactivarProducto', { productId: productoId });
};

const ProducServices = {
  obtenerCategoriaActions,
  obtenerProductoIdApi,
  obtenerProductosAuthor,
  obtenerProductosUser,
  obtenerProductosMasVistos,
  borrarProducto,
  crearNuevoProductoAction,
  editarProducto,
  obtenerProductosPorPalabras,
  sendMailPegatinas,
  editReservedState,
  editVendidoState,
  obtenerNumeroVistasProducto,
  reactivarProducto,
};

export default ProducServices;
