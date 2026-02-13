import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  borrarProducto,
  setProductToEdit,
  obtenerProductosAuthor,
  reactivarProducto,
} from '../../reduxLib/slices/productSlices';
import Producto from './Producto';

const ProductoUser = ({ producto }) => {
  const { _id, activo = true } = producto;
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
        });
      }
    });
  };

  const sendtoEdicion = () => {
    dispatch(setProductToEdit(producto));
    router.push(`/productos/user/editar/${producto._id}`);
  };

  const handleReactivar = (_id) => {
    Swal.fire({
      title: '¿Reactivar producto?',
      text: 'El producto volverá a ser visible en el catálogo público',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reactivarProducto(_id)).then((res) => {
          dispatch(obtenerProductosAuthor(producto.author._id));
        });
      }
    });
  };

  return (
    <Producto producto={producto} showFavorite={false}>
      {user && producto.author._id === user._id && (
        <div className='flex gap-1 px-2 pb-2'>
          {!activo ? (
            <Button
              variant='outline'
              className='w-full border-blue-500 text-blue-600 hover:bg-blue-50 text-xs px-1'
              onClick={() => handleReactivar(_id)}
            >
              Reactivar
            </Button>
          ) : (
            <>
              <Button
                variant='outline'
                className='flex-1 border-green-500 text-green-600 hover:bg-green-50 text-xs px-1'
                onClick={sendtoEdicion}
              >
                Editar
              </Button>
              <Button
                variant='outline'
                className='flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-xs px-1'
                onClick={() => confirmarBorrarProducto(_id)}
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      )}
    </Producto>
  );
};

export default ProductoUser;
