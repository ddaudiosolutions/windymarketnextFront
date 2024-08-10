import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* import './Producto.css'; */
import ProductoUser from './ProductoUser';
/* import BuscoPostUser from './BuscoPostUser'; */
import { cargarProductosAuthor, getUserId } from '../../helpers/utils';
import Producto from './Producto';
/* import { useHistory, useLocation } from 'react-router'; */

const ProductosAuth = () => {
  const productos = useSelector((state) => state.products.productsAuth);
  const idAuthor = getUserId();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productos) {
      cargarProductosAuthor(dispatch, idAuthor);
    }
  }, [dispatch, idAuthor, productos]);

  return (
    <Fragment>
      {/*    <div className='d-flex justify-content-center mt-4'> */}
      <div className='container'>
        <div className='d-flex justify-content-center mt-4'>
          <div
            className='row row-cols-2 row-cols-xs-4 row-cols-sm-3 row-cols-md-3 
          row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 g-2 justify-content-center mx-4'
          >
            {!productos
              ? null
              : productos.map((producto) => <Producto key={producto._id} producto={producto} />)}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductosAuth;
