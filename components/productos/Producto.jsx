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
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.users.user);
  const favoritos = user?.favoritos || [];

  const esFavorito = _.includes(favoritos, producto._id);

  const verProductoId = () => {
    dispatch(setProductId(producto));
    router.push(`/productos/${producto._id}`);
  };

  const handleFavorite = () => {
    if (!user) return;

    const action = esFavorito
      ? removeFavoriteProduct({ productId: producto._id, userId: user._id })
      : addFavoriteProduct({ productId: producto._id, userId: user._id });

    dispatch(action).then((res) => {
      if (res.payload?.status === 200) {
        dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
      }
    });
  };

  const firstImage =
    images.length > 0 && images[0].url
      ? images[0].url
      : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg';

  const firstFilename = (images.length === 0 || images[0].filename) ?? 'WindyMarket';

  return (
    <Card className='product-card w-full p-0 overflow-hidden transition-shadow duration-200 hover:shadow-[0_10px_20px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.06)]'>
      <div className='relative cursor-pointer' onClick={() => verProductoId(producto)}>
        <img src={firstImage} className='w-full aspect-square object-cover' alt={firstFilename} />
        {producto.reservado && (
          <div className='absolute bottom-0 left-0 right-0 bg-black/70 py-1.5 md:py-2'>
            <span className='text-white font-saira-stencil text-xs md:text-sm block text-center'>
              Reservado
            </span>
          </div>
        )}
        {producto.vendido && (
          <div className='absolute bottom-0 left-0 right-0 bg-black/70 py-1.5 md:py-2'>
            <span className='text-white font-saira-stencil text-xs md:text-sm block text-center'>Vendido</span>
          </div>
        )}
      </div>
      <CardContent className='space-y-1 px-2 md:px-3 pt-1.5 md:pt-2 pb-2'>
        {/* Precio + acciones */}
        <div className='flex items-center justify-between'>
          <span className='text-sm md:text-base font-semibold text-slate-900'>{price}€</span>

          <div className='flex items-center gap-1.5 md:gap-2'>
            {delivery && (
              <img
                src='/images/wm_delivery.jpg'
                alt='DeliveryWindymarket_icon'
                className='h-3.5 w-3.5 md:h-4 md:w-4 opacity-80'
                title='Envío disponible'
              />
            )}

            {user &&
              (esFavorito ? (
                <BsHeartFill
                  className='text-red-500 text-base md:text-lg cursor-pointer'
                  onClick={handleFavorite}
                />
              ) : (
                <BsHeart
                  className='text-slate-700 text-base md:text-lg cursor-pointer'
                  onClick={handleFavorite}
                />
              ))}
          </div>
        </div>

        {/* Título */}
        <p className='truncate text-xs md:text-sm text-slate-600'>{title}</p>
      </CardContent>
    </Card>
  );
};

export default Producto;
