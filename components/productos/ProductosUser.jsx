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
    <Fragment>
      <div
        className='row row-cols-2 row-cols-xs-2 
        row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center '
      >
        {productos === undefined
          ? null
          : productos.map((producto) => <ProductoUser key={producto._id} producto={producto} />)}
      </div>
    </Fragment>
  );
};

export default ProductosUser;
