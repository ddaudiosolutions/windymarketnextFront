import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import {
  obtenerProductos,
  obtenerProductosMasVistos,
  obtenerProductosPorPalabras,
} from '../reduxLib/slices/productSlices';
import { obtenerDatosUsuario } from '../reduxLib/slices/usersSlice';
import { getFavoriteProducts } from '../reduxLib/slices/favoriteProductsSlice';
import { getUserId } from '../helpers/utils';

/**
 * Custom hook para manejar la búsqueda y carga de productos
 * @param {Array} searchWords - Palabras de búsqueda
 * @returns {Object} Funciones de carga
 */
export const useProductSearch = (searchWords) => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');

  // Cargar productos basados en búsqueda
  const cargarProductos = useCallback(() => {
    dispatch(obtenerProductos({ busquedaquery, pagequery })).then(() =>
      dispatch(obtenerProductosMasVistos()),
    );
  }, [dispatch, busquedaquery, pagequery]);

  // Cargar datos del usuario
  const cargarDatosUsuario = useCallback(async () => {
    const userId = getUserId();
    if (userId) {
      const res = await dispatch(obtenerDatosUsuario(userId));
      if (res.payload?.status === 200) {
        dispatch(getFavoriteProducts(res.payload.data.favoritos));
      }
    }
  }, [dispatch]);

  // Efectos
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  useEffect(() => {
    cargarDatosUsuario();
  }, [cargarDatosUsuario]);

  useEffect(() => {
    if (searchWords && searchWords.length > 0) {
      dispatch(obtenerProductosPorPalabras(searchWords));
    }
  }, [searchWords, dispatch]);

  return {
    cargarProductos,
    cargarDatosUsuario,
    busquedaquery,
    pagequery,
  };
};
