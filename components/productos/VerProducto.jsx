'use client'

import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toDate, format } from 'date-fns';
import { cargarProductoIdApi, cargarProductosAuthor, extraerIdDeURL } from '../../helpers/utils';
import Footer from '../WhatsApp/layout/Footer';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../reduxLib/slices/usersSlice';
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

const VerProducto = () => {
  const producto = useSelector((state) => state.products.productoId);
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
          cargarProductoIdApi(dispatch, producto._id)
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
          cargarProductoIdApi(dispatch, producto._id)
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
          cargarProductoIdApi(dispatch, producto._id)
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
          cargarProductoIdApi(dispatch, producto._id)
        }
      });
    }
  };

  useEffect(() => {
    if (productoId) {
      cargarProductoIdApi(dispatch, producto._id)
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
      dispatch(
        addFavoriteProduct({ productId: producto._id, userId: userId })
      ).then((res) => {
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
      <div className='container mx-auto px-4 max-w-3xl'>
        <div className='bg-white rounded-xl shadow-sm mt-3 p-4'>
          <div className='flex justify-between items-start'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() => cargarProductosAuthor(dispatch, router, producto)}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={producto.author.imagesAvatar[0]?.url || '/Avatar_Default2.png'}
                  alt={`${authorName} avatar`}
                />
                <AvatarFallback className="bg-windy-cyan text-white">
                  {authorName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h5 className='font-saira-stencil text-windy-cyan ml-3 text-lg'>
                {authorName}
              </h5>
            </div>
            <div>
              {userId === producto.author._id && (
                <div className='flex gap-2 flex-wrap justify-end'>
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

          <div className='mt-4 relative'>
            <Carousel className="w-full">
              <CarouselContent>
                {(producto.images && producto.images.length > 0 ? producto.images : [{ url: 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg', _id: 'fakeImage' }]).map((image, index) => (
                  <CarouselItem key={image._id || index}>
                    <a href={image.url} target='_blank' rel='noreferrer' className="block relative">
                      <img
                        src={image.url}
                        className='w-full h-96 object-contain bg-gray-100 rounded-lg'
                        alt={`Producto imagen ${index + 1}`}
                      />
                      {reservado && (
                        <div className='absolute bottom-4 left-0 right-0 bg-black/70 py-2'>
                          <span className='text-white font-saira-stencil text-base block text-center'>
                            Reservado
                          </span>
                        </div>
                      )}
                      {vendido && (
                        <div className='absolute bottom-4 left-0 right-0 bg-black/70 py-2'>
                          <span className='text-white font-saira-stencil text-base block text-center'>
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
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          </div>
          <div className='mt-3 flex justify-end'>
            <WhatsappShareButton url={url}>
              <WhatsappIconShare size={25} />
            </WhatsappShareButton>
          </div>

          <div className='mt-4'>
            <h4 className='font-saira-stencil text-windy-cyan text-2xl mb-2'>
              Precio: {producto.price} €
            </h4>
            <h5 className='font-saira text-gray-800 text-lg mb-4'>
              {producto.title}
            </h5>

            <div className='flex items-center justify-between mb-4'>
              {isLogged && producto.delivery && (
                <BotonGestionEnvio setShowForm={setShowForm} />
              )}

              <div className='flex items-center gap-4 ml-auto'>
                <span className='font-saira text-gray-500 text-sm'>
                  {clonedDateFormat}
                </span>
                {isLogged && (
                  favorite ? (
                    <BsHeartFill
                      className='text-red-500 cursor-pointer text-xl'
                      onClick={handleFavorite}
                    />
                  ) : (
                    <BsHeart
                      className='text-black cursor-pointer text-xl'
                      onClick={handleFavorite}
                    />
                  )
                )}
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-4 mb-4'>
              <p className='font-saira text-gray-700 whitespace-pre-wrap'>
                {producto.description}
              </p>
            </div>

            <div className='bg-gray-50 rounded-lg p-4'>
              {isLogged && (
                <>
                  {!producto.author.showPhone && (
                    <div className='mb-2'>
                      <label className='font-saira text-gray-700'>
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

            <div className='text-center my-6'>
              <Button
                variant="outline"
                className="border-windy-cyan text-windy-cyan hover:bg-windy-cyan hover:text-white font-saira"
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
