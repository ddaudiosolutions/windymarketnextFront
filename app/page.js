'use client';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { obtenerProductos, obtenerProductosMasVistos } from '@/reduxLib/slices/productSlices';
import MostrarProductos from '@/components/productos/MostrarProductos';

export default function Home() {
  const dispatch = useDispatch();

  // Cargar productos iniciales
  const cargarProductos = useCallback(() => {
    dispatch(obtenerProductos({ busquedaquery: 'ultimos_productos', pagequery: '0' })).then(() =>
      dispatch(obtenerProductosMasVistos()),
    );
  }, [dispatch]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);
  return (
    <>
      {/* Hero Section con CTA principal */}
      <div className='relative py-4 md:py-6 lg:py-8 px-4 mb-4 md:mb-6 bg-gradient-to-br from-windy-cyan/10 via-white to-windy-cyan/10 overflow-hidden'>
        {/* Efectos visuales de fondo */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,217,223,0.15),transparent_50%)]'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,217,223,0.12),transparent_50%)]'></div>

        <div className='relative z-10 max-w-5xl mx-auto text-center'>
          {/* Título principal */}
          <h1 className='font-saira-stencil text-lg md:text-2xl lg:text-3xl xl:text-4xl text-slate-800 font-light mb-2 md:mb-3'>
            El marketplace del windsurf,<br className='hidden md:block' /> windfoil y wingfoil
          </h1>

          {/* Subtítulo */}
          <p className='text-slate-600 text-xs md:text-sm lg:text-base font-saira max-w-3xl mx-auto mb-4 md:mb-5'>
            Compra y vende material <span className='font-semibold text-windy-cyan'>sin comisiones</span> y con envío seguro en toda España.
          </p>

          {/* Botón principal */}
          <div className='flex flex-col sm:flex-row gap-2 justify-center items-center mb-4 md:mb-6'>
            <Link
              href='/productos/nuevo'
              className='group relative inline-flex items-center gap-2 px-5 py-2.5 bg-windy-cyan hover:bg-windy-cyan/90 text-white font-saira text-sm md:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
            >
              <span>Publicar gratis</span>
              <svg
                className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </Link>

            <Link
              href='/productos?busqueda=ultimos_productos&page=0'
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-saira text-sm md:text-base font-medium rounded-lg border-2 border-slate-200 hover:border-windy-cyan/50 transition-all duration-300'
            >
              Ver productos
            </Link>
            <Link
              href='/envios'
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-windy-cyan hover:bg-slate-50 text-slate-700 font-saira text-sm md:text-base font-medium rounded-lg border-2 border-slate-200 hover:border-windy-cyan/50 transition-all duration-300'
            >
              Gestiona un envio
            </Link>
          </div>

          {/* Beneficios */}
          <div className='mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto'>
            <div className='flex flex-col items-center gap-1'>
              <div className='w-10 h-10 bg-windy-cyan/10 rounded-full flex items-center justify-center'>
                <svg className='w-5 h-5 text-windy-cyan' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='font-saira font-semibold text-slate-800 text-sm'>Sin comisiones</h3>
              <p className='text-xs text-slate-600'>0% de comisión en tus ventas</p>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <div className='w-10 h-10 bg-windy-cyan/10 rounded-full flex items-center justify-center'>
                <svg className='w-5 h-5 text-windy-cyan' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
                </svg>
              </div>
              <h3 className='font-saira font-semibold text-slate-800 text-sm'>Envío disponible</h3>
              <p className='text-xs text-slate-600'>Para todo tipo de material</p>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <div className='w-10 h-10 bg-windy-cyan/10 rounded-full flex items-center justify-center'>
                <svg className='w-5 h-5 text-windy-cyan' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='font-saira font-semibold text-slate-800 text-sm'>Solo comunidad wind</h3>
              <p className='text-xs text-slate-600'>Windsurf - Foil - Wing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de productos */}
      <MostrarProductos />
    </>
  )
}
