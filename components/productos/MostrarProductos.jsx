'use client';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListaProductos from './ListaProductos';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  obtenerProductosPorPalabras,
  clearProductsByWords,
} from '../../reduxLib/slices/productSlices';
import SearchByWords from '../busquedaPorTexto/SearchByWords';
import NavbarCategories from '../categorias/NavbarCategories';
import HappyBanner from '../banners/HappyBanner';
import { ProductoMasVistos } from '../googleAnalytics/ProductoMasVistos';

const MostrarProductos = () => {
  const productos = useSelector((state) => state.products.productos.prodAll);
  const productosPorPalabras = useSelector((state) => state.products.productsByWords);
  const paginasTotales = useSelector((state) => state.products.productos.totalPages);
  const productosMasVistos = useSelector((state) => state.products.productosMasVistos);
  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);

  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA

  const params = useSearchParams();
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');

  const [searchWords, setSearchWords] = useState([]);

  const dispatch = useDispatch();
  const mostrarProductoMasVistos = !busquedaquery || busquedaquery === 'ultimos_productos';
  const userData = useSelector((state) => state.users.user);

  useEffect(() => {
    // Solo hacer dispatch si hay contenido en searchWords
    if (searchWords && searchWords.searchWord && searchWords.searchWord.length > 0) {
      dispatch(obtenerProductosPorPalabras(searchWords));
    }
  }, [searchWords]);

  // Resetear búsqueda por palabras cuando cambia la categoría desde la URL
  useEffect(() => {
    if (busquedaquery) {
      setSearchWords([]);
      dispatch(clearProductsByWords());
    }
  }, [busquedaquery, pagequery]);

  return (
    <Fragment>
      <div className='main-container'>
        {/* Toolbar de Búsqueda y Categorías */}
        <div className='mx-auto px-2 md:px-4 mb-6 md:mb-8'>
          <div className='max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6'>
            {/* Búsqueda */}
            <div className='mb-4 md:mb-6'>
              <SearchByWords setSearchWords={setSearchWords} />
            </div>
            {/* Categorías */}
            <div className='border-t border-slate-100 pt-4 md:pt-6'>
              <NavbarCategories />
            </div>
          </div>
        </div>

        {/* Sección de Productos */}
        <div className='px-2 md:px-4'>
          {searchWords &&
          searchWords.searchWord &&
          searchWords.searchWord.length > 0 &&
          !busquedaquery ? (
            <ListaProductos productos={productosPorPalabras} />
          ) : (
            <>
              <div className='flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8'>
                <div className='h-px bg-gradient-to-r from-transparent via-windy-cyan/40 to-windy-cyan/40 flex-1 max-w-md'></div>
                <h2 className='font-saira-stencil text-base md:text-lg lg:text-xl font-light text-slate-800 border-2 border-windy-cyan/40 px-4 md:px-6 py-2 md:py-2.5 rounded-lg shadow-sm bg-white/80 whitespace-nowrap'>
                  {busquedaquery && busquedaquery !== 'ultimos_productos'
                    ? busquedaquery.charAt(0).toUpperCase() + busquedaquery.slice(1).toLowerCase()
                    : 'Últimas novedades'}
                </h2>
                <div className='h-px bg-gradient-to-l from-transparent via-windy-cyan/40 to-windy-cyan/40 flex-1 max-w-md'></div>
              </div>
              <ListaProductos productos={productos} />
            </>
          )}
        </div>

        {/* Paginación */}
        <div className='flex flex-wrap justify-center mt-6 md:mt-8 gap-2 px-2 md:px-4'>
          {busquedaquery && busquedaquery !== 'ultimos_productos' &&
            paginas.map((pagina) => {
              return (
                <Link
                  type='submit'
                  key={pagina}
                  href={`/productos?busqueda=${busquedaquery}&page=${pagina}`}
                  className='rounded-md hover:bg-windy-cyan/10 transition-colors duration-200'
                >
                  <h2
                    className='font-saira text-sm md:text-base lg:text-lg px-3 md:px-4 py-1.5 md:py-2'
                    style={{
                      color: Number(pagequery) === Number(pagina) ? '#201e2f' : 'rgb(56, 217, 223)',
                      fontWeight: Number(pagequery) === Number(pagina) ? '600' : '400',
                    }}
                  >
                    {pagina + 1}
                  </h2>
                </Link>
              );
            })}
        </div>

        {/* Productos Más Vistos */}
        {mostrarProductoMasVistos &&
        productosMasVistos &&
        Array.isArray(productosMasVistos) &&
        productosMasVistos.length > 0 ? (
          <div className='mt-8 md:mt-12 px-2 md:px-4'>
            <div className='flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8'>
              <div className='h-px bg-gradient-to-r from-transparent via-windy-cyan/40 to-windy-cyan/40 flex-1 max-w-md'></div>
              <h2 className='font-saira-stencil text-base md:text-lg lg:text-xl font-light text-slate-800 border-2 border-windy-cyan/40 px-4 md:px-6 py-2 md:py-2.5 rounded-lg shadow-sm bg-white/80 whitespace-nowrap'>
                Productos más vistos
              </h2>
              <div className='h-px bg-gradient-to-l from-transparent via-windy-cyan/40 to-windy-cyan/40 flex-1 max-w-md'></div>
            </div>
            <div className='flex justify-center'>
              <ProductoMasVistos productosMasvistos={productosMasVistos} />
            </div>
          </div>
        ) : mostrarProductoMasVistos ? (
          <div className='mt-8 md:mt-12 px-2 md:px-4'>
            <div className='flex justify-center'>
              <p className='text-slate-500 text-sm md:text-base font-saira'>
                No hay suficientes datos de productos más vistos aún
              </p>
            </div>
          </div>
        ) : null}

        {/* Banner */}
        <div className='mt-8 md:mt-12'>
          <HappyBanner />
        </div>
      </div>
    </Fragment>
  );
};

export default MostrarProductos;
