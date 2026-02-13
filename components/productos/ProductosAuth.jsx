'use client';

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      <div className='main-container'>
        <div className='product-grid-container flex justify-center mt-3 md:mt-4'>
          <div className='product-grid flex flex-wrap justify-center gap-3 md:gap-4 max-w-full w-full'>
          {productos?.map((producto) => (
            <ProductoUser key={producto._id} producto={producto} />
          ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductosAuth;
