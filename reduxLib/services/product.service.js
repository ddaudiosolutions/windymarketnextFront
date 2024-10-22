import clienteAxios from '../../config/axios';


/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREAR NUEVOS PRODUCTOS
const crearNuevoProductoAction = (producto, history) => {
  return clienteAxios.post('productos/newproduct', producto);
};

// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
const obtenerCategoriaActions = (pageAndData) => {
  const { busquedaquery, pagequery } = pageAndData;
  return clienteAxios.get(`productos?busqueda=${busquedaquery}&page=${pagequery}`);
};

// DESCARGAR PRODUCTOS USUARIO

const obtenerNumeroVistasProducto = (productoId) => {
  console.log('obtenerNumeroVistasProducto', productoId)
  return clienteAxios.post(`productos/getViewsProduct`, { productoId })
}

const obtenerProductosMasVistos = () => {
  /*  console.log('entrando en mostviewed FRONT'); */
  return clienteAxios.get(`productos/mostviewedProducts`);
};

const obtenerProductosUser = (pageNuser) => {
  return clienteAxios.get(`productos/user?=${pageNuser}`);
};

const obtenerProductoIdApi = (productoid) => {
  return clienteAxios.get(`productos/${productoid}`);
};

const obtenerProductosPorPalabras = (words) => {
  return clienteAxios.post(`productos/searchByWords`, words);
};

// SELECCIONAR Y ELIMINAR PRODUCTO
const borrarProducto = (id) => {
  return clienteAxios.delete(`productos/user/${id}`);
};

/// ///////////////////////////////////////////////
// EDITAR EL PRODUCTO /////
const editarProducto = (productData) => {
  const { formData, id } = productData;
  return clienteAxios.put(`productos/user/editar/${id}`, formData);
};

/// ////////////////////
// DESCARGAR TODOS LOS PRODUCTOS DE UN USUARIO
/// //////
const obtenerProductosAuthor = (authorId) => {
  return clienteAxios.get(`productos/auth/${authorId}`);
};

const sendMailPegatinas = (emailData) => {
  return clienteAxios.post('productos/envioPegatinas', emailData);
};

const editReservedState = (stateData) => {
  return clienteAxios.post('productos/editReservedState', stateData);
};
const editVendidoState = (stateData) => {
  return clienteAxios.post('productos/editVendidoState', stateData);
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
  obtenerNumeroVistasProducto
};

export default ProducServices;
