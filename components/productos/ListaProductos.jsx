import Producto from './Producto';
const ListaProductosBusqueda = ({ productos }) => {
  return (
    <div className='product-grid-container flex justify-center mt-3 md:mt-4'>
      <div className='product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-4 md:px-6 max-w-7xl w-full'>
        {productos?.map((producto, busqueda) => {
          if (!producto) return null;
          return <Producto key={producto._id} producto={producto} busqueda={busqueda} />;
        })}
      </div>
    </div>
  );
};

export default ListaProductosBusqueda;
