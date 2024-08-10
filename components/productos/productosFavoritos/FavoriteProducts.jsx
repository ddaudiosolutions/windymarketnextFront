'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFavoriteProducts } from '../../../reduxLib/slices/favoriteProductsSlice';
import ListaProductos from '../ListaProductos';

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
      <div className='mt-5'>{<ListaProductos productos={favoriteProductsData} />}</div>
    </>
  );
}

export default FavoriteProducts;
