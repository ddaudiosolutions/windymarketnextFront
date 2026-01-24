'use client';

import { useDispatch, useSelector } from 'react-redux';
import ListaProductosBusqueda from '@/components/ListaProductos';
import { useEffect } from 'react';
import { getFavoriteProducts } from '@/components/../../slices/favoriteProductsSlice';

function FavoriteProducts() {
  const favoriteProductsId = useSelector((state) => state.users.user?.favoritos);
  const dispatch = useDispatch();
  const favoriteProductsData = useSelector((state) => state.favoriteProducts.favoriteProducts);
  if (favoriteProductsData === null) return null;
  const fetchFavoriteProducts = () => {
    dispatch(getFavoriteProducts(favoriteProductsId));
  };
  useEffect(() => {
    fetchFavoriteProducts();
    // eslint-disable-next-line
  }, [favoriteProductsId]);

  return (
    <>
      <h5 className='mt-5'>Tus Favoritos</h5>
      {/* <h8>Los productos de WindyMarket que más te gustan</h8> */}
      <div className='mt-5'>{<ListaProductosBusqueda productos={favoriteProductsData} />}</div>
    </>
  );
}

export default FavoriteProducts;
