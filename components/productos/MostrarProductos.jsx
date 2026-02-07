'use client';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListaProductos from './ListaProductos';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { obtenerProductosPorPalabras } from '../../reduxLib/slices/productSlices';
import SearchByWords from '../busquedaPorTexto/SearchByWords';
import NavbarCategories from '../categorias/NavbarCategories';
import HappyBanner from '../banners/HappyBanner';
import { ProductoMasVistos } from '../googleAnalytics/ProductoMasVistos';

const MostrarProductos = () => {
  const productos = useSelector((state) => state.products.productos.prodAll);
  const productosPorPalabras = useSelector((state) => state.products.productsByWords);
  const paginasTotales = useSelector((state) => state.products.productos.totalPages);
  const productosMasVistos = useSelector(
    (state) => state.products.productosMasVistos.productosVistas,
  );
  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);

  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA

  const params = useSearchParams();
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');

  const [searchWords, setSearchWords] = useState([]);

  const dispatch = useDispatch();
  const mostrarProductoMasVistos = busquedaquery === 'ultimos_productos';
  const userData = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(obtenerProductosPorPalabras(searchWords));
  }, [searchWords]);

  return (
    <Fragment>
      <div className='main-container'>
        <div className='mx-auto px-2 md:px-4'>
          <SearchByWords setSearchWords={setSearchWords} />
        </div>
        <div className='mb-3 mx-auto mt-3 md:mt-4 px-2 md:px-4'>
          <div>
            <h2 className='text-center mb-3 md:mb-5 font-saira text-lg md:text-xl lg:text-2xl'> Compra y vende material para Navegar </h2>
          </div>
          <div>
            <NavbarCategories />
          </div>
        </div>

        <div className='mt-2'>
          {productosPorPalabras !== undefined && productosPorPalabras.length === 0 ? (
            <>
              <h2 className='text-center font-saira text-base md:text-lg lg:text-xl mb-3 md:mb-4'>
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

        <div className='flex flex-wrap justify-center mt-3 md:mt-4 gap-2 px-2'>
          {busquedaquery !== 'ultimos_productos' &&
            paginas.map((pagina) => {
              return (
                <Link
                  type='submit'
                  key={pagina}
                  href={`/productos?busqueda=${busquedaquery}&page=${pagina}`}
                  className='rounded'
                >
                  <h2
                    className='font-saira text-sm md:text-base lg:text-lg px-2 py-1'
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
          <div className='mt-3 md:mt-4 px-2 md:px-4'>
            <h2 className='text-center font-saira text-base md:text-lg lg:text-xl mb-3'> Productos Más Vistos </h2>
            <div className='flex justify-center'>
              <ProductoMasVistos productosMasvistos={productosMasVistos} />
            </div>
          </div>
        ) : null}
        <HappyBanner />
      </div>
    </Fragment>
  );
};

export default MostrarProductos;
