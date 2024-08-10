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
import styles from './Producto.module.css';
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
    dispatch(setProductId(producto));
    router.push(`/productos/${producto._id}`);
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
      <div className='card border-light mb-5 ms-2' style={{ width: '200px', height: '300px' }}>
        <div className='m-2 border-light ' type='button' onClick={() => verProductoId(producto)}>
          <Imagen valor={firstImage} />
          {producto.reservado && <div className={styles.textOverImage}>Reservado</div>}
          {producto.vendido && <div className={styles.textOverImage}>Vendido</div>}
        </div>
        <div className='container mt-2'>
          <div className='row'>
            <h5 className={`${styles.productPrice} col`}>{price} EUR</h5>
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
          <div className='row'>
            <h5 className={styles.productTitle}>{title}</h5>
            {delivery && (
              <div className='d-flex'>
                <img
                  src='/images/windyMarket_delivery_Icon.jpg'
                  alt='DeliveryWindymarket_icon'
                  style={{ width: '1.2rem', height: '1.5rem' }}
                ></img>
                <h6 className='ms-3 mt-'>Envio Disponible</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Producto;
