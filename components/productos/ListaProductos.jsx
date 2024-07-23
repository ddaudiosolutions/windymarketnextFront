import Producto from './Producto';
/* import estilos from './listaProductos.module.css'; */
const ListaProductosBusqueda = ({ productos }) => {
  /* console.log("productosBusqueda", productos); */
  return (
    <div className='d-flex justify-content-center mt-4'>
      <div>
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
