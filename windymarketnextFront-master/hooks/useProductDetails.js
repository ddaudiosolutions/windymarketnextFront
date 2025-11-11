import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../helpers/utils';
import {
  obtenerProductoIdApi,
  obtenerNumeroVistasProducto,
  changeReservedProductState,
  changeVendidoProductState,
} from '../reduxLib/slices/productSlices';
import {
  obtenerDatosUsuario,
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../reduxLib/slices/usersSlice';
import { getFavoriteProducts } from '../reduxLib/slices/favoriteProductsSlice';
import includes from 'lodash/includes';

/**
 * Custom hook para manejar la lógica de detalles de producto
 * @param {string} productoId - ID del producto
 * @returns {Object} Estado y funciones del producto
 */
export const useProductDetails = (productoId) => {
  const dispatch = useDispatch();
  const producto = useSelector((state) => state.products.productoId);
  const user = useSelector((state) => state.users.user);
  const userId = getUserId();
  
  const [reservado, setReservado] = useState(false);
  const [vendido, setVendido] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const productoFavoritos = user?.favoritos || [];

  // Cargar datos del producto
  useEffect(() => {
    if (productoId) {
      dispatch(obtenerProductoIdApi(productoId));
      dispatch(obtenerNumeroVistasProducto(productoId));
    }
  }, [productoId, dispatch]);

  // Actualizar estados cuando cambie el producto
  useEffect(() => {
    if (producto) {
      setReservado(producto.reservado || false);
      setVendido(producto.vendido || false);
      setFavorite(includes(productoFavoritos, producto._id));
    }
  }, [producto, productoFavoritos]);

  // Cargar datos del usuario si está logueado
  useEffect(() => {
    if (userId && !user) {
      dispatch(obtenerDatosUsuario(userId));
    }
  }, [userId, user, dispatch]);

  // Manejar cambio de estado reservado
  const handleReservado = useCallback(() => {
    if (!producto) return;

    dispatch(
      changeReservedProductState({
        productId: producto._id,
        reservado: !reservado,
      }),
    ).then((res) => {
      if (res.payload?.status === 200) {
        dispatch(obtenerProductoIdApi(productoId));
      }
    });
  }, [dispatch, producto, reservado, productoId]);

  // Manejar cambio de estado vendido
  const handleVendido = useCallback(() => {
    if (!producto) return;

    dispatch(
      changeVendidoProductState({
        productId: producto._id,
        vendido: !vendido,
      }),
    ).then((res) => {
      if (res.payload?.status === 200) {
        dispatch(obtenerProductoIdApi(productoId));
      }
    });
  }, [dispatch, producto, vendido, productoId]);

  // Manejar favoritos
  const handleFavorite = useCallback(() => {
    if (!producto || !userId) return;

    setFavorite(!favorite);
    
    if (favorite) {
      dispatch(
        removeFavoriteProduct({
          productId: productoId,
          userId: userId,
        }),
      ).then((res) => {
        if (res.payload?.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else {
      dispatch(
        addFavoriteProduct({ 
          productId: productoId, 
          userId: userId 
        })
      ).then((res) => {
        if (res.payload?.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    }
  }, [dispatch, producto, userId, favorite, productoId]);

  return {
    producto,
    reservado,
    vendido,
    favorite,
    showForm,
    setShowForm,
    handleReservado,
    handleVendido,
    handleFavorite,
    isOwner: userId === producto?.author?._id,
    isLogged: !!userId,
  };
};
