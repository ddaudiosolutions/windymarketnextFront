import clienteAxios from '../../config/axios';

/* const user = sessionStorage.getItem('userToken'); */
const data = {
  headers: {
    'x-auth-token': 'papito',
  },
};

/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREAR NUEVOS PRODUCTOS
const crearNuevoProductoAction = (producto, history) => {
  return clienteAxios.post('productos/newproduct', producto, data);
};

// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
const obtenerCategoriaActions = (pageAndData) => {
  const { busquedaquery, pagequery } = pageAndData;
  return clienteAxios.get(`productos?busqueda=${busquedaquery}&page=${pagequery}`, data);
};

// DESCARGAR PRODUCTOS USUARIO

const obtenerProductosMasVistos = () => {
  /*  console.log('entrando en mostviewed FRONT'); */
  return clienteAxios.get(`productos/mostviewedProducts`, data);
};

const obtenerProductosUser = (pageNuser) => {
  return clienteAxios.get(`productos/user?=${pageNuser}`, data);
};

const obtenerProductoIdApi = (productoid) => {
  return clienteAxios.get(`productos/${productoid}`);
};

const obtenerProductosPorPalabras = (words) => {
  return clienteAxios.post(`productos/searchByWords`, words, data);
};

// SELECCIONAR Y ELIMINAR PRODUCTO
const borrarProducto = (id) => {
  return clienteAxios.delete(`productos/user/${id}`, data);
};

/// ///////////////////////////////////////////////
// EDITAR EL PRODUCTO /////
const editarProducto = (productData) => {
  const { formData, id } = productData;
  return clienteAxios.put(`productos/user/editar/${id}`, formData, data);
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
  editVendidoState
};

export default ProducServices;
