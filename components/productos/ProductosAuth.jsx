'use client';

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Producto.css';
import ProductoUser from './ProductoUser';
import BuscoPostUser from './BuscoPostUser';
import { cargarProductosAuthor } from '@/helpers/utils';
import { useHistory, useLocation } from 'react-router';

const ProductosAuth = () => {
  const productos = useSelector((state) => state.products.productsAuth);
  const buscoPostsUser = useSelector((state) => state.buscoPosts.postsUser);

  const location = useLocation();
  const idAuthor = location.pathname.split('/')[3];
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!productos) {
      cargarProductosAuthor(dispatch, history, { author: { _id: idAuthor } });
    }
  }, [dispatch, history, idAuthor, productos]);

  return (
    <Fragment>
      <div className='container mt-4 '>
        <div className='card'></div>
      </div>
      <div
        className='row row-cols-2 row-cols-xs-2 
      row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center mt-2'
      >
        {!productos
          ? null
          : productos.map((producto) => <ProductoUser key={producto._id} producto={producto} />)}
      </div>
      <div
        className='row row-cols-2 row-cols-xs-2 
      row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center '
      >
        {buscoPostsUser === undefined
          ? null
          : buscoPostsUser.map((postUser) => (
              <BuscoPostUser key={postUser._id} postUser={postUser} />
            ))}
      </div>
    </Fragment>
  );
};

export default ProductosAuth;
