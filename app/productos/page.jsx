// app/productos/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { obtenerProductos, obtenerProductosMasVistos } from '../../reduxLib/slices/productSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import MostrarProductos from '../../components/productos/MostrarProductos';

const ProductosPage = () => {
  return <MostrarProductos />;
};

export default ProductosPage;
