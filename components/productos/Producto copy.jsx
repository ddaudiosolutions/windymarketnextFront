'use client';
import Imagen from '@/app/componentes/Imagen';
import Link from 'next/link';
import { setProductId } from '../../reduxLib/slices/productSlices';
import { useDispatch } from 'react-redux';

const Producto = ({ producto }) => {
  const dispatch = useDispatch();
  const { title, price, images } = producto;
  const firstImage =
    images.length > 0 && images[0].url
      ? images[0].url
      : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg';

  const verProductoId = (producto) => {
    dispatch(setProductId(producto));
    history.push(`/productos/${producto._id}`);
  };
  return (
    <>
      <div className='card border-light ' style={{ width: '200px', height: '300px' }}>
        <Link href='/productos/[id]' as={`/productos/${producto._id}`}>
          <div className=''>
            <Imagen valor={firstImage} />
          </div>
        </Link>
        <div className='mt-2'>
          <h5 className='col product-price '>{price}€</h5>
          <h5>{title}</h5>
        </div>
      </div>
    </>
  );
};

export default Producto;
