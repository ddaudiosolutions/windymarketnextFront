'use client';

import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toDate, format } from 'date-fns';
import { cargarProductoIdApi, cargarProductosAuthor, extraerIdDeURL } from '../../helpers/utils';
import { trackProductView } from '../../helpers/analyticsCalls';
import Footer from '../WhatsApp/layout/Footer';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addFavoriteProduct, removeFavoriteProduct } from '../../reduxLib/slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../reduxLib/slices/favoriteProductsSlice';
import {
  changeReservedProductState,
  changeVendidoProductState,
} from '../../reduxLib/slices/productSlices';
import ContactoentreUsers from '../envioMensajes/ContactoentreUsers';
import BotonGestionEnvio from '../gestionEnvios/BotonGestionEnvio';

import GestionEnvioModal from '../modals/GestionEnvioModal';
import BotonReservarProducto from './botonesProducto/BotonReservarProducto';
import BotonVendidoProducto from './botonesProducto/BotonVendidoProducto';
import BotonEditarProducto from './botonesProducto/BotonEditarProducto';

import { WhatsappShareButton } from 'react-share';
import WhatsappIconShare from './iconos/WhatsappIconShare';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const VerProducto = ({ producto: productoProp }) => {
  const productoRedux = useSelector((state) => state.products.productoId);
  const producto = productoProp || productoRedux;
  let paginaActual = useSelector((state) => state.products.paginaActual);
  const user = useSelector((state) => state.users.user);

  const userId = user?._id || null;
  const isLogged = userId !== null;
  const productoFavoritos = user?.favoritos || [];

  if (paginaActual === undefined) {
    paginaActual = 0;
  }

  const [url, setUrl] = useState('');
  const productoId = extraerIdDeURL(url);
  const dispatch = useDispatch();
  const router = useRouter();
  const fechaCreado = producto !== undefined ? producto.creado : null;
  const authorName = producto !== undefined ? producto.author.nombre : null;

  const [clonedDateFormat, setClonedDateFormat] = useState(null);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (fechaCreado) {
      const date = new Date(fechaCreado);
      const clonedDate = toDate(date);
      setClonedDateFormat(clonedDate !== 'Invalid Date' ? format(clonedDate, 'dd-MM-yyyy') : null);
    }
  }, [fechaCreado]);

  // Trackear vista del producto en Google Analytics
  useEffect(() => {
    if (producto && producto._id) {
      trackProductView(producto._id, producto.title);
    }
  }, [producto]);

  const [reservado, setReservado] = useState(producto ? producto.reservado : false);
  const handleReservado = () => {
    if (reservado) {
      dispatch(
        changeReservedProductState({
          productId: producto._id,
          reservado: false,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          cargarProductoIdApi(dispatch, producto._id);
        }
      });
    } else if (reservado === false) {
      dispatch(
        changeReservedProductState({
          productId: producto._id,
          reservado: true,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          cargarProductoIdApi(dispatch, producto._id);
        }
      });
    }
  };

  const [vendido, setVendido] = useState(producto ? producto.vendido : false);

  useEffect(() => {
    if (producto !== undefined) {
      setReservado(producto.reservado);
      setVendido(producto.vendido);
    }
  }, [producto]);

  const handleVendido = () => {
    if (vendido) {
      dispatch(
        changeVendidoProductState({
          productId: producto._id,
          vendido: false,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          cargarProductoIdApi(dispatch, producto._id);
        }
      });
    } else if (vendido === false) {
      dispatch(
        changeVendidoProductState({
          productId: producto._id,
          vendido: true,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          cargarProductoIdApi(dispatch, producto._id);
        }
      });
    }
  };

  useEffect(() => {
    if (productoId) {
      cargarProductoIdApi(dispatch, producto._id);
    }
  }, [dispatch, productoId]);

  const existe = (productoFavoritos, producto) => {
    return _.includes(productoFavoritos, producto);
  };

  // CREAR FORMULARIO PARA GESTION DE DATOS DE ENVIO
  const [showForm, setShowForm] = useState(false);

  const [favorite, setFavorite] = useState(
    producto ? existe(productoFavoritos, producto._id) : false
  );

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(
        removeFavoriteProduct({
          productId: producto._id,
          userId: userId,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else if (favorite === false) {
      dispatch(addFavoriteProduct({ productId: producto._id, userId: userId })).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    }
  };

  if (producto === null || producto === undefined) return null;

  return (
    <Fragment>
      {/*  <MetaTagsDinamicas
        title={producto.title}
        image={producto.images[0].url}
        url={url}
        description={producto.description}
      /> */}
      <GestionEnvioModal
        show={showForm}
        handleClose={() => setShowForm(false)}
        datosRemitente={producto}
      />
      <div>{/* <GoogleAds /> */}</div>
      <div className='container mx-auto px-2 md:px-4 max-w-3xl'>
        <div className='bg-white rounded-xl shadow-sm mt-2 md:mt-3 p-3 md:p-4'>
          <div className='flex justify-between items-start flex-wrap gap-2'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() => cargarProductosAuthor(dispatch, router, producto)}
            >
              <Avatar className='w-10 h-10 md:w-12 md:h-12'>
                <AvatarImage
                  src={producto.author.imagesAvatar[0]?.url || '/Avatar_Default2.png'}
                  alt={`${authorName} avatar`}
                />
                <AvatarFallback className='bg-windy-cyan text-white'>
                  {authorName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h5 className='font-saira-stencil text-gray-800 ml-2 md:ml-3 text-base md:text-lg'>{authorName}</h5>
            </div>
            <div className='w-full sm:w-auto'>
              {userId === producto.author._id && (
                <div className='flex gap-1 md:gap-2 flex-wrap justify-end'>
                  <BotonReservarProducto
                    reservado={reservado}
                    handleReservado={handleReservado}
                    setReservado={setReservado}
                  />
                  <BotonVendidoProducto
                    vendido={vendido}
                    handleVendido={handleVendido}
                    setVendido={setVendido}
                  />
                  <BotonEditarProducto producto={producto} />
                </div>
              )}
            </div>
          </div>

          <div className='mt-3 md:mt-4 relative'>
            <Carousel className='w-full'>
              <CarouselContent>
                {(producto.images && producto.images.length > 0
                  ? producto.images
                  : [
                      {
                        url: 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg',
                        _id: 'fakeImage',
                      },
                    ]
                ).map((image, index) => (
                  <CarouselItem key={image._id || index}>
                    <a href={image.url} target='_blank' rel='noreferrer' className='block relative'>
                      <img
                        src={image.url}
                        className='w-full h-64 md:h-80 lg:h-96 object-contain bg-gray-100 rounded-lg'
                        alt={`Producto imagen ${index + 1}`}
                      />
                      {reservado && (
                        <div className='absolute bottom-2 md:bottom-4 left-0 right-0 bg-black/70 py-1.5 md:py-2'>
                          <span className='text-white font-saira-stencil text-sm md:text-base block text-center'>
                            Reservado
                          </span>
                        </div>
                      )}
                      {vendido && (
                        <div className='absolute bottom-2 md:bottom-4 left-0 right-0 bg-black/70 py-1.5 md:py-2'>
                          <span className='text-white font-saira-stencil text-sm md:text-base block text-center'>
                            Vendido
                          </span>
                        </div>
                      )}
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {producto.images && producto.images.length > 1 && (
                <>
                  <CarouselPrevious className='left-2' />
                  <CarouselNext className='right-2' />
                </>
              )}
            </Carousel>
          </div>

          <div className='mt-4 md:mt-6'>
            {/* Título prominente */}
            <h1 className='font-saira text-gray-900 text-xl md:text-2xl font-light mb-2 md:mb-3 leading-tight'>
              {producto.title}
            </h1>

            {/* Precio e iconos de acción */}
            <div className='flex items-center justify-between mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-200'>
              <h2 className='font-saira text-gray-900 text-xl md:text-2xl font-medium'>{producto.price}€</h2>

              <div className='flex items-center gap-2 md:gap-4'>
                <WhatsappShareButton url={url}>
                  <div className='p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors'>
                    <WhatsappIconShare size={20} className='md:w-6 md:h-6' />
                  </div>
                </WhatsappShareButton>

                {isLogged &&
                  (favorite ? (
                    <BsHeartFill
                      className='text-red-500 cursor-pointer text-xl md:text-2xl hover:scale-110 transition-transform'
                      onClick={handleFavorite}
                    />
                  ) : (
                    <BsHeart
                      className='text-gray-600 cursor-pointer text-xl md:text-2xl hover:text-red-500 hover:scale-110 transition-all'
                      onClick={handleFavorite}
                    />
                  ))}
              </div>
            </div>

            {/* Metadata y botón de gestión */}
            <div className='flex items-center justify-between mb-3 md:mb-4 gap-2 flex-wrap'>
              <span className='font-saira text-gray-500 text-xs md:text-sm'>
                Publicado el {clonedDateFormat}
              </span>

              {isLogged && producto.delivery && <BotonGestionEnvio setShowForm={setShowForm} />}
            </div>

            <div className='bg-gray-50 rounded-lg p-3 md:p-4 mb-3 md:mb-4'>
              <p className='font-saira text-gray-700 text-sm md:text-base whitespace-pre-wrap'>{producto.description}</p>
            </div>

            <div className='bg-gray-50 rounded-lg p-3 md:p-4'>
              {isLogged && (
                <>
                  {!producto.author.showPhone && (
                    <div className='mb-2'>
                      <label className='font-saira text-gray-700 text-sm md:text-base'>
                        Llámame o manda un WhatsApp: {producto.author.telefono}
                      </label>
                    </div>
                  )}
                  <ContactoentreUsers
                    productId={productoId}
                    sellerEmail={producto.author.email}
                    sellerName={producto.author.nombre}
                  />
                </>
              )}
              <Footer />
            </div>

            <div className='text-center my-4 md:my-6'>
              <Button
                variant='outline'
                className='border-windy-cyan text-windy-cyan hover:bg-windy-cyan hover:text-white font-saira text-xs md:text-sm px-3 md:px-4'
                asChild
              >
                <Link href={`/productos?busqueda=${producto.categoria}&page=${paginaActual}`}>
                  Volver a Categoria: {producto.categoria.toUpperCase()}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerProducto;
