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
      <div className='max-w-7xl mx-auto mt-4 px-4'>
        <div
          className='
    grid
    grid-cols-[repeat(auto-fit,minmax(280px,280px))]
    gap-6
    justify-center
  '
        >
          {productos?.map((producto) => (
            <ProductoUser key={producto._id} producto={producto} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductosAuth;
