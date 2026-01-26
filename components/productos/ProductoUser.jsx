import { Fragment } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import {
  borrarProducto,
  setProductId,
  setProductToEdit,
  obtenerProductosAuthor,
} from '../../reduxLib/slices/productSlices';

const ProductoUser = ({ producto }) => {
  const { title, price, images, _id, description } = producto;
  const dispatch = useDispatch();
  const router = useRouter();

  // Confirmar si desea Eliminar el Producto
  const confirmarBorrarProducto = (_id) => {
    Swal.fire({
      title: 'Seguro quieres eliminar ?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Producto!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProducto(_id)).then((res) => {
          dispatch(obtenerProductosAuthor(producto.author._id));
          router.push(`/productos/auth/${producto.author._id}`);
        });
      }
    });
  };

  const verProductoId = (producto) => {
    dispatch(setProductId(producto));
    router.push(`/productos/${producto._id}`);
  };

  const sendtoEdicion = (producto) => {
    dispatch(setProductToEdit(producto));
    router.push(`/productos/user/editar/${producto._id}`);
  };
  return (
    <div className='flex flex-col'>
      <div className='w-[280px]'>
        <Card className='w-[280px] h-auto shadow-lg hover:shadow-xl transition-shadow cursor-pointer'>
          <div className='relative' onClick={() => verProductoId(producto)}>
            {images[0]?.url === undefined ? (
              <img
                src='/LOGO_CIRCULAR_SIN_FONDO.png'
                className='w-[280px] h-[220px] object-contain p-4'
                alt='avatar for User windymarket windsurf segunda mano'
              />
            ) : (
              <img
                src={images[0].url}
                className='w-[280px] h-[220px] object-cover rounded-t-xl'
                alt={images[0].filename}
              />
            )}
            {producto.reservado && (
              <div className='absolute bottom-0 left-0 right-0 bg-black/70 py-2'>
                <span className='text-white font-saira-stencil text-sm block text-center'>
                  Reservado
                </span>
              </div>
            )}
            {producto.vendido && (
              <div className='absolute bottom-0 left-0 right-0 bg-black/70 py-2'>
                <span className='text-white font-saira-stencil text-sm block text-center'>
                  Vendido
                </span>
              </div>
            )}
          </div>
          <CardContent className='px-4 py-3'>
            <h5 className='font-saira text-black text-base font-semibold truncate'>{title}</h5>
            <h5 className='font-saira text-windy-cyan text-lg font-bold mb-2'>{price}€</h5>
            <p className='text-gray-600 text-sm line-clamp-2'>{description}</p>
          </CardContent>
        </Card>

        {producto.author._id === sessionStorage.getItem('userId') && (
          <div className='flex gap-2 mt-3 justify-center'>
            <Button
              variant='outline'
              className='flex-1 border-green-500 text-green-600 hover:bg-green-50'
              onClick={() => sendtoEdicion(producto)}
            >
              Editar
            </Button>
            <Button
              variant='outline'
              className='flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50'
              onClick={() => confirmarBorrarProducto(_id)}
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoUser;
