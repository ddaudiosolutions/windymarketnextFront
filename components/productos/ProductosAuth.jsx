'use client';

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Producto.css';
import ProductoUser from './ProductoUser';
import { cargarProductosAuthor } from '@/helpers/utils';
import { useRouter, usePathname } from 'next/navigation'; 

const ProductosAuth = () => {
  const productos = useSelector((state) => state.products.productsAuth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const idAuthor = pathname.split('/')[3];

  useEffect(() => {
    if (!productos) {
      cargarProductosAuthor(dispatch, router, { author: { _id: idAuthor } });
    }
  }, [dispatch, router, idAuthor, productos]);

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
    </Fragment>
  );
};

export default ProductosAuth;
