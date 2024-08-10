import { Fragment } from 'react';
/* import './Producto.css'; */
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import {
  borrarProducto,
  setProductId,
  setProductToEdit,
  obtenerProductosAuthor,
} from '../../reduxLib/slices/productSlices';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/helpers/utils';

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
    <Fragment>
      <div className='card border-light ' style={{ width: '200px', height: '300px' }}>
        <div
          className='card me-1 ms-1 border-light'
          type='button'
          onClick={() => verProductoId(producto)}
        >
          {images[0]?.url === undefined ? (
            <img
              src='/LOGO_CIRCULAR_SIN_FONDO.png'
              className='card-img-topAvatar ms-4 mt-3'
              alt='avatar for User windymarket windsurf segunda mano'
            ></img>
          ) : (
            <img src={images[0].url} className='card-img-top ' alt={images[0].filename}></img>
          )}
          <div className='card-body '>
            <div className='container'>
              <h5 className='titleH5-product  card-title'>{title}</h5>
              <h5 className='product-price m-1 mb-1'>{price}EUR</h5>
              <div className='prodPreDescription m-1 mb-1' rows='1'>
                {description}
              </div>
            </div>
          </div>
        </div>
        {producto.author._id === getUserId() && (
          <div className='card-footer text-center mb-3 gap-2 rounded m-2 me-2'>
            <button
              className='col-md-3 m-2 ms-3 btn btn-outline-success me-2'
              onClick={() => sendtoEdicion(producto)}
            >
              Editar
            </button>

            <button
              className='col-md-4 m-2 ms-3 btn btn-outline-warning me-2'
              onClick={() => confirmarBorrarProducto(_id)}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductoUser;
