import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductoUser from './ProductoUser';
import { obtenerProductosUser } from '../../slices/productSlice';

const ProductosUser = () => {
  const productos = useSelector((state) => state.products.productosUser);
  const [pageNuser, setPageNuser] = useState('0');
  const envioPagina = (pagina) => {
    setPageNuser(pagina);
  };

  const dispatch = useDispatch();
  const cargarProductosUser = (pageNuser) => dispatch(obtenerProductosUser(pageNuser));

  useEffect(() => {
    cargarProductosUser(pageNuser);
    envioPagina();
    // eslint-disable-next-line
  }, [pageNuser]);

  return (
    <div className='d-flex justify-content-center mt-4'>
      <div
        className='row row-cols-2 row-cols-xs-4 row-cols-sm-3 row-cols-md-3 
    row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 g-2 justify-content-center mx-4'
      >
        {productos === undefined
          ? null
          : productos.map((producto) => <ProductoUser key={producto._id} producto={producto} />)}
      </div>
    </div>
  );
};

export default ProductosUser;
