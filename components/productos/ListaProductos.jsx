import Producto from './Producto';
const ListaProductosBusqueda = ({ productos }) => {
  return (
    <div className='product-grid-container flex justify-center mt-4'>
      <div className='product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center mx-4'>
        {productos?.map((producto, busqueda) => {
          if (!producto) return null;
          return <Producto key={producto._id} producto={producto} busqueda={busqueda} />;
        })}
      </div>
    </div>
  );
};

export default ListaProductosBusqueda;
