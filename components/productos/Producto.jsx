import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setProductId } from '../../reduxLib/slices/productSlices';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addFavoriteProduct, removeFavoriteProduct } from '../../reduxLib/slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../reduxLib/slices/favoriteProductsSlice';
import { Card, CardContent } from '@/components/ui/card';

const Producto = ({ producto }) => {
  const { title, price, images, delivery } = producto;
  const favoritos = useSelector((state) => state.users?.user?.favoritos || []);
  const productoFavoritos =
    sessionStorage.getItem('userId') !== null && favoritos !== undefined ? favoritos : null;
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

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(
        removeFavoriteProduct({
          productId: producto._id,
          userId: sessionStorage.getItem('userId'),
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else if (favorite === false) {
      dispatch(
        addFavoriteProduct({ productId: producto._id, userId: sessionStorage.getItem('userId') })
      ).then((res) => {
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
    <Card className="product-card">
      <div
        className="relative"
        onClick={() => verProductoId(producto)}
      >
        <img
          src={firstImage}
          className="w-full"
          alt={firstFilename}
        />
        {producto.reservado && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2">
            <span className="text-white font-saira-stencil text-sm block text-center">
              Reservado
            </span>
          </div>
        )}
        {producto.vendido && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2">
            <span className="text-white font-saira-stencil text-sm block text-center">
              Vendido
            </span>
          </div>
        )}
      </div>
      <CardContent>
        <div className="flex items-center justify-between">
          <h5 className="font-saira text-black text-sm font-medium">
            {price}€
          </h5>
          {sessionStorage.getItem('userId') !== null && (
            favorite ? (
              <BsHeartFill
                className="text-red-500 cursor-pointer text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite();
                }}
              />
            ) : (
              <BsHeart
                className="text-black cursor-pointer text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite();
                }}
              />
            )
          )}
        </div>
        <h5 className="font-saira text-windy-cyan text-sm font-normal truncate overflow-hidden whitespace-nowrap">
          {title}
        </h5>
        {delivery && (
          <div className="flex items-center mt-1">
            <img
              src="/images/wm_delivery.jpg"
              alt="DeliveryWindymarket_icon"
              className="w-6 h-6 object-contain"
            />
            <h6 className="font-saira-stencil text-windy-cyan text-xs ml-2">
              Envio Disponible
            </h6>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Producto;
