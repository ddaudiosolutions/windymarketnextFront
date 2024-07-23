// app/productos/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { obtenerProductos, obtenerProductosMasVistos } from '../../reduxLib/slices/productSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import MostrarProductos from '../../components/productos/MostrarProductos';

const ProductosPage = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');

  // Wrap cargarProductos with useCallback
  const cargarProductos = useCallback(() => {
    dispatch(obtenerProductos({ busquedaquery, pagequery })).then(() =>
      dispatch(obtenerProductosMasVistos()),
    );
  }, [dispatch, busquedaquery, pagequery]); // Include all dependencies here

  useEffect(() => {
    cargarProductos(); // Now you can safely include cargarProductos in the dependency array
  }, [cargarProductos]); // Include cargarProductos in the dependency array

  return <MostrarProductos />;
};

export default ProductosPage;
