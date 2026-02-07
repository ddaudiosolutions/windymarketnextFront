import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
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
  const user = useSelector((state) => state.users.user);

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
    <div className='flex flex-col w-full'>
      <div className='w-full max-w-[280px] mx-auto'>
        <Card className='w-full h-auto shadow-lg hover:shadow-xl transition-shadow cursor-pointer'>
          <div className='relative' onClick={() => verProductoId(producto)}>
            {images[0]?.url === undefined ? (
              <img
                src='/LOGO_CIRCULAR_SIN_FONDO.png'
                className='w-full h-48 md:h-56 object-contain p-4'
                alt='avatar for User windymarket windsurf segunda mano'
              />
            ) : (
              <img
                src={images[0].url}
                className='w-full h-48 md:h-56 object-cover rounded-t-xl'
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
          <CardContent className='px-3 md:px-4 py-2 md:py-3'>
            <h5 className='font-saira text-black text-sm md:text-base font-semibold truncate'>{title}</h5>
            <h5 className='font-saira text-gray-900 text-base md:text-lg font-bold mb-2'>{price}€</h5>
            <p className='text-gray-600 text-xs md:text-sm line-clamp-2'>{description}</p>
          </CardContent>
        </Card>

        {user && producto.author._id === user._id && (
          <div className='flex gap-2 mt-3 justify-center'>
            <Button
              variant='outline'
              className='flex-1 border-green-500 text-green-600 hover:bg-green-50 text-xs md:text-sm px-2 md:px-4'
              onClick={() => sendtoEdicion(producto)}
            >
              Editar
            </Button>
            <Button
              variant='outline'
              className='flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-xs md:text-sm px-2 md:px-4'
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
