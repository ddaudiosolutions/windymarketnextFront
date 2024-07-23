import Producto from './Producto';
/* import estilos from './listaProductos.module.css'; */
const ListaProductosBusqueda = ({ productos }) => {
  /* console.log("productosBusqueda", productos); */
  return (
    <div className='d-flex justify-content-center mt-4'>
      <div
        className='row row-cols-2 row-cols-xs-4 row-cols-sm-3 row-cols-md-3 
    row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 g-2 justify-content-center mx-4'
      >
        {!productos
          ? null
          : productos.map((producto, busqueda) => (
              <Producto key={producto._id} producto={producto} busqueda={busqueda} />
            ))}
      </div>
    </div>
  );
};

export default ListaProductosBusqueda;
