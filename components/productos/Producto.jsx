'use client';
import { Fragment, useState } from 'react';

import Imagen from '@/app/componentes/Imagen';
import { useDispatch, useSelector } from 'react-redux';
import { setProductId } from '../../reduxLib/slices/productSlices';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addFavoriteProduct, removeFavoriteProduct } from '../../reduxLib/slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../reduxLib/slices/favoriteProductsSlice';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/helpers/utils';
/* import './Producto.css'; */

const Producto = ({ producto }) => {
  const { title, price, images, /* description, */ delivery } = producto;
  const favoritos = useSelector((state) => state.users.user?.favoritos || []);
  const productoFavoritos = getUserId() && favoritos !== undefined ? favoritos : null;
  const dispatch = useDispatch();
  const router = useRouter();
  const existe = (productoFavoritos, producto) => {
    return _.includes(productoFavoritos, producto);
  };

  const verProductoId = (producto) => {
    console.log('verProductoId', producto);
    dispatch(setProductId(producto));
    const queryString = new URLSearchParams(producto).toString();
    router.push(`/productos/${producto._id}?${queryString}`);
  };

  const [favorite, setFavorite] = useState(existe(productoFavoritos, producto._id));
  // funcion para cambiar el estado de verdadero a falso al pulsar el boton favoritos
  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(
        removeFavoriteProduct({
          productId: producto._id,
          userId: getUserId(),
        }),
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else if (favorite === false) {
      dispatch(addFavoriteProduct({ productId: producto._id, userId: getUserId() })).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    }
  };

  const firstImage =
    images.length > 0 && images[0].url
      ? images[0].url
      : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg';

  const firstFilename = (images.length === 0 || images[0].filename) ?? 'WindyMarket';

  return (
    <Fragment>
      <div className='card border-light ' style={{ width: '200px', height: '300px' }}>
        <div
          className='card me-1 ms-1 border-light'
          type='button'
          onClick={() => verProductoId(producto)}
        >
          <div className=''>
            <Imagen valor={firstImage} />
            {producto.reservado && (
              <div className='text-container mt-3'>
                <div className='text-over-image'>Reservado</div>
              </div>
            )}
            {producto.vendido && (
              <div className='text-container mt-3'>
                <div className='text-over-image'>Vendido</div>
              </div>
            )}
          </div>
        </div>
        <div className='card-body'>
          <div className='container'>
            <div className='row'>
              <h5 className='col product-price m-1'>{price}€</h5>
              {getUserId() &&
                (favorite ? (
                  <BsHeartFill
                    className='col-2 mt-1'
                    style={{ color: 'red', paddingRight: '5px' }}
                    onClick={() => {
                      handleFavorite();
                    }}
                  />
                ) : (
                  <BsHeart
                    className='col-2 mt-1'
                    style={{ color: 'black', paddingRight: '5px' }}
                    onClick={() => {
                      handleFavorite();
                    }}
                  />
                ))}
            </div>
          </div>
          <h5 className='titleH5-product  card-title m-1'>{title}</h5>
          {delivery && (
            <div className='d-flex'>
              <img
                src='/images/windyMarket_delivery_Icon.jpg'
                alt='DeliveryWindymarket_icon'
                style={{ width: '1.2rem', height: '1.5rem' }}
              ></img>
              <h6 className='ms-3 mt-1'>Envio Disponible</h6>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Producto;
