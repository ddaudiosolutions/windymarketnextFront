'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListaProductos from './ListaProductos';
/* import ListadoPosts from "./ListadoPosts"; */
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  obtenerProductos,
  obtenerProductosMasVistos,
  obtenerProductosPorPalabras,
} from '../../reduxLib/slices/productSlices';
/* import { obtenerBuscoPosts } from "../../slices/buscoPostSlice"; */
import { obtenerDatosUsuario } from '../../reduxLib/slices/usersSlice';
import { getFavoriteProducts } from '../../reduxLib/slices/favoriteProductsSlice';
import SearchByWords from '../busquedaPorTexto/SearchByWords';
import NavbarCategories from '../categorias/NavbarCategories';
/* import Navbar from "../Navbar"; */
import HappyBanner from '../banners/HappyBanner';
import { ProductoMasVistos } from '../googleAnalytics/ProductoMasVistos';
import { getToken, getUserId } from '../../helpers/utils';
/* import { Helmet } from 'react-helmet'; */

/* import WebCamsContainer from "../webCams/WebCamsContainer"; */
/* 
import GoogleAds from '../adsense/GoogleAds'; */

const MostrarProductos = () => {
  const productos = useSelector((state) => state.products.productos.prodAll);
  const productosPorPalabras = useSelector((state) => state.products.productsByWords);
  const paginasTotales = useSelector((state) => state.products.productos.totalPages);
  const productosMasVistos = useSelector(
    (state) => state.products.productosMasVistos.productosVistas,
  );
  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);

  const params = useSearchParams();
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');

  const [searchWords, setSearchWords] = useState([]);

  const dispatch = useDispatch();
  const mostrarProductoMasVistos = busquedaquery === 'ultimos_productos';

  /* const cargarBuscoPosts = () => dispatch(obtenerBuscoPosts()); */
  const cargarProductos = () =>
    dispatch(obtenerProductos({ busquedaquery, pagequery })).then(() =>
      dispatch(obtenerProductosMasVistos()),
    );
  useEffect(() => {
    cargarProductos(busquedaquery, pagequery);
  }, [busquedaquery, pagequery]);
  const cargarDatosUsuario = useCallback(async () => {
    const userId = getUserId();
    if (userId) {
      const res = await dispatch(obtenerDatosUsuario(userId));
      if (res.payload.status === 200) {
        dispatch(getFavoriteProducts(res.payload.data.favoritos));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(obtenerProductosPorPalabras(searchWords));
  }, [searchWords]);

  useEffect(() => {
    cargarDatosUsuario();
  }, [cargarDatosUsuario]);

  return (
    <Fragment>
      <div className='container '>
        <div className='container'>
          <div className='container'>
            {/*  <WebCamsContainer /> */}
            <div className='mx-auto'>
              <SearchByWords setSearchWords={setSearchWords} />
            </div>
            <div className='mb-3 col-9 mx-auto bg-form mt-4'>
              <div className=''>
                {/* <GoogleAds /> */}
                <h2 className='text-center mb-5'> Compra y vende material para Navegar </h2>
              </div>
              <div>
                <div className='row'>
                  <NavbarCategories />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 container'>
            {productosPorPalabras !== undefined && productosPorPalabras.length === 0 ? (
              <>
                <h2 className='text-center'>
                  {' '}
                  {busquedaquery !== 'ultimos_productos'
                    ? busquedaquery.toUpperCase()
                    : 'Últimas novedades'}
                </h2>
                <ListaProductos productos={productos} />
              </>
            ) : (
              <ListaProductos productos={productosPorPalabras} />
            )}
          </div>

          <div className='d-flex justify-content-center mt-4 '>
            {busquedaquery !== 'ultimos_productos' &&
              paginas.map((pagina) => {
                return (
                  <Link
                    type='submit'
                    key={pagina}
                    href={`/productos?busqueda=${busquedaquery}&page=${pagina}`}
                    className='rounded btn page-link'
                  >
                    <h2
                      className='me-4 '
                      style={{
                        color:
                          Number(pagequery) === Number(pagina) ? '#201e2f' : 'rgb(56, 217, 223)',
                      }}
                    >
                      {pagina + 1}
                    </h2>
                  </Link>
                );
              })}
          </div>

          {mostrarProductoMasVistos && productosMasVistos !== undefined ? (
            <div className='mt-3'>
              <h2 className='text-center'> Productos Más Vistos </h2>
              <div className='d-flex justify-content-center mt-4 '>
                <ProductoMasVistos productosMasvistos={productosMasVistos} />
              </div>
            </div>
          ) : null}
          <HappyBanner />
        </div>
      </div>
    </Fragment>
  );
};

export default MostrarProductos;
