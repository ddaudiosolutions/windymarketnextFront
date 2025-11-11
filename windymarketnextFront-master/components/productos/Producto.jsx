'use client'; // Necesario para `useState` y `useEffect` en Next.js App Router

import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import Imagen from '@/app/componentes/Imagen';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProductId,
  setProductToEdit,
  borrarProducto,
  obtenerProductosAuthor,
} from '../../reduxLib/slices/productSlices';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addFavoriteProduct, removeFavoriteProduct } from '../../reduxLib/slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../reduxLib/slices/favoriteProductsSlice';
import { useRouter, usePathname } from 'next/navigation';
import { getUserId } from '@/helpers/utils';
import styles from './Producto.module.css';

const Producto = ({ producto }) => {
  const { title, price, images, _id, delivery, slug, url, author } = producto;
  const favoritos = useSelector((state) => state.users.user?.favoritos || []);
  const productoFavoritos = getUserId() && favoritos !== undefined ? favoritos : null;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const existeEnFavoritos = _.includes(productoFavoritos, _id);

  // Estado para saber si el producto es favorito
  const [favorite, setFavorite] = useState(existeEnFavoritos);

  // 🔹 Nueva función para ir a la página del producto con `slug + id`
  const verProductoId = (producto) => {
    dispatch(setProductId(producto));
    // Si el `slug` está vacío, solo usa el ID (seguridad adicional)
    if (!slug) {
      router.push(`/productos/${_id}`);
    } else {
      router.push(`/productos/${slug}-${_id}`);
    }
  };

  // 🔹 Función para manejar favoritos
  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(removeFavoriteProduct({ productId: _id, userId: getUserId() })).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else {
      dispatch(addFavoriteProduct({ productId: _id, userId: getUserId() })).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    }
  };

  const sendtoEdicion = (producto) => {
    dispatch(setProductToEdit(producto));
    router.push(`/productos/user/editar/${_id}`);
  };

  // 🔹 Confirmar eliminación del producto
  const confirmarBorrarProducto = () => {
    Swal.fire({
      title: 'Seguro quieres eliminar?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar Producto!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProducto(_id)).then((res) => {
          dispatch(obtenerProductosAuthor(author._id));
          router.push(`/productos/auth/${author._id}`);
        });
      }
    });
  };

  // 🔹 Imagen principal del producto
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

        {/* Detalles del producto */}
        <div className='container mt-2'>
          <div className='row'>
            <h5 className={`${styles.productPrice} col`}>{price} EUR</h5>

            {/* Botón de favoritos */}
            {getUserId() && (
              <div className='col-2'>
                {favorite ? (
                  <BsHeartFill
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={handleFavorite}
                  />
                ) : (
                  <BsHeart style={{ color: 'black', cursor: 'pointer' }} onClick={handleFavorite} />
                )}
              </div>
            )}
          </div>

          {/* Nombre del producto y opciones de envío */}
          <div className='row'>
            <h5 className={styles.productTitle}>{title}</h5>
            {delivery && (
              <div className='d-flex'>
                <img
                  src='/images/windyMarket_delivery_Icon.jpg'
                  alt='DeliveryWindymarket_icon'
                  style={{ width: '1.2rem', height: '1.5rem' }}
                />
                <h6 className='ms-3'>Envío Disponible</h6>
              </div>
            )}
          </div>
        </div>

        {/* Opciones de edición y eliminación (solo para el dueño) */}
        {author?._id === getUserId() && pathname.includes('/productos/auth') && (
          <div className='row mt-3'>
            <button className='col-md me-2 btn btn-outline-success' onClick={sendtoEdicion}>
              Editar
            </button>
            <button className='col-md btn btn-outline-warning' onClick={confirmarBorrarProducto}>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Producto;
