'use client'

import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './VerProducto.css';
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

import { /* FacebookIcon, FacebookShareButton, */ WhatsappShareButton } from 'react-share';
import WhatsappIconShare from './iconos/WhatsappIconShare';
/* import MetaTagsDinamicas from '../gestionOpenGraph/MetaTagsDinamicas'; */

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
      <div className='container col-sm-9 col-md-9 col-lg-7 col-xl-7'>
        <div className='cardVerProducto mt-3 '>
          <div className='d-flex justify-content-between'>
            <div
              className='d-flex justify-content-start  mt-3'
              type='button'
              onClick={() => cargarProductosAuthor(dispatch, router, producto)}
            >
              {producto.author.imagesAvatar[0].url === undefined ? (
                <img
                  src='/Avatar_Default2.png'
                  className='card-img-topAvatar ms-4 mt-3'
                  alt='avatar for User windymarket windsurf segunda mano'
                ></img>
              ) : (
                <img
                  src={producto.author.imagesAvatar[0].url}
                  className='card-img-topAvatar ms-4 mt-3'
                  alt='avatarUser windymarket windsurf segunda mano'
                ></img>
              )}
              <h5 className='h2Author ms-2 mt-4'>{authorName}</h5>
            </div>
            <div>
              {userId === producto.author._id && (
                <div className='mt-4'>
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
          <div>
            <div
              id='carouselExampleControlsNoTouching'
              className='carousel carousel-dark slide'
              data-bs-touch='false'
              data-bs-interval='false'
            >
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <a
                    className=' '
                    href={
                      producto.images && producto.images.length > 0 && producto.images[0].url
                        ? producto.images[0].url
                        : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg'
                    }
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img
                      src={
                        producto.images && producto.images.length > 0 && producto.images[0].url
                          ? producto.images[0].url
                          : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg'
                      }
                      style={{ height: '25rem' }}
                      key={
                        producto.images && producto.images.length > 0 && producto.images[0]._id
                          ? producto.images[0]._id
                          : 'fakeImage'
                      }
                      className='card-img-top mt-3'
                      alt='...'
                    ></img>
                    {reservado && (
                      <div className='text-container mt-3'>
                        <div className='text-over-image'>Reservado</div>
                      </div>
                    )}
                    {vendido && (
                      <div className='text-container mt-3'>
                        <div className='text-over-image'>Vendido</div>
                      </div>
                    )}
                  </a>
                </div>
                {producto.images.slice(1).map((image) => (
                  <div className='carousel-item' key={image._id}>
                    <a className=' ' href={image.url} target='_blank' rel='noreferrer'>
                      <img
                        src={image.url}
                        style={{ height: '25rem' }}
                        key={image._id}
                        className='card-img-top mt-3'
                        alt='... windymarket windsurf segunda mano'
                      ></img>
                    </a>
                  </div>
                ))}
              </div>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#carouselExampleControlsNoTouching'
                data-bs-slide='prev'
              >
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#carouselExampleControlsNoTouching'
                data-bs-slide='next'
              >
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </div>
          </div>
          <div className='mt-3 me-2 d-flex justify-content-end'>
            <WhatsappShareButton url={url}>
              <WhatsappIconShare size={25} />
            </WhatsappShareButton>

            {/* <FacebookShareButton url={url} className='ms-3'>
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton> */}
          </div>
          <div className='card-body'>
            <h4 className=' price-hp1'>Precio: {producto.price} €</h4>
            <h5 className='card-title titleH5VerProducto rounded mt-1'>{producto.title}</h5>
            <div className='container'>
              <div className='row align-items-end mb-3 mt-4'>
                {isLogged && producto.delivery && (
                  <div className='col-auto ' style={{ paddingLeft: 0 }}>
                    <BotonGestionEnvio setShowForm={setShowForm} />
                  </div>
                )}

                <div className='col d-flex justify-content-end'>
                  <div className='col-3 pproductoTitleFecha '>{clonedDateFormat}</div>
                  {isLogged &&
                    (favorite ? (
                      <BsHeartFill
                        className='col-1  mb-1 rounded'
                        style={{ color: 'red' }}
                        onClick={() => {
                          handleFavorite();
                        }}
                      />
                    ) : (
                      <BsHeart
                        className='col-1   mb-1 rounded'
                        style={{ color: 'black' }}
                        onClick={() => {
                          handleFavorite();
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className='card-header mb-2'>
              <p className='card-title pproductoTitle'>{producto.description}</p>
            </div>
            <div className='card-header'>
              <div className='card-title pproductoTitle'>
                {isLogged && (
                  <>
                    {!producto.author.showPhone && (
                      <div>
                        <label>Llámame o manda un WhatsApp: {producto.author.telefono}</label>
                      </div>
                    )}
                    <ContactoentreUsers
                      productId={productoId}
                      sellerEmail={producto.author.email}
                      sellerName={producto.author.nombre}
                    />
                  </>
                )}
                {/* <SendMessage phoneNumber={producto.author.telefono} /> */}
                <Footer />
              </div>
            </div>

            <div className='text-center my-4'>
              <Link
                href={`/productos?busqueda=${producto.categoria}&page=${paginaActual}`}
                className='btn btn-outline-success'
              >
                Volver a Categoria: {producto.categoria.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerProducto;
