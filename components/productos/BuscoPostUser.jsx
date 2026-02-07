import { Fragment } from 'react';
import './Producto.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
// REDUX
import { useDispatch } from 'react-redux';
import { borrarBuscoPostsUserAction, setPostToEdit, setPostId } from '../../slices/buscoPostSlice';
import { cargarProductosAuthor } from '../../helpers/utils';

const BuscoPostUser = ({ postUser }) => {
  const { title, _id } = postUser;
  const dispatch = useDispatch();
  const history = useHistory();

  // Confirmar si desea Eliminar el Producto
  const confirmarBorrarBuscoPosts = (_id) => {
    Swal.fire({
      title: 'Seguro quieres eliminar ?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Busqueda!',
    }).then((result) => {
      if (result.isConfirmed) {
        // pasalor al Action
        dispatch(borrarBuscoPostsUserAction(_id)).then((res) => {
          if (res.payload.status === 200) {
            Swal.fire('Correcto', 'POST BORRADO CON EXITO', 'success').then(function () {
              cargarProductosAuthor(dispatch, history, postUser);
            });
          }
          // la confirmación de esto se pasa al productoAction correspondiente
        });
      }
    });
  };

  const verBuscoPostId = (buscoPost) => {
    dispatch(setPostId(buscoPost));
    history.push(`/buscoposts/${buscoPost._id}`);
  };

  const sendtoEdicion = () => {
    dispatch(setPostToEdit(postUser));
    history.push(`/buscoposts/user/editar/${postUser._id}`);
  };
  return (
    <Fragment>
      <div>
        <div
          className='shadow-sm mx-1 cursor-pointer'
          type='button'
          onClick={() => verBuscoPostId(postUser)}
        >
          <div className='rounded-lg shadow-sm mx-1 mt-3 md:mt-4 bg-white border border-gray-200 overflow-hidden'>
            <img
              src='/SE_BUSCA_LOGO.png'
              className='w-full h-40 md:h-48 object-cover'
              alt='SE_BUSCA_IMG windsuf windymarket segunda mano'
            ></img>

            <div className='p-3 md:p-4'>
              <h5 className='titleH5-post text-center text-sm md:text-base'>{title}</h5>
            </div>
          </div>
        </div>
        {postUser.author._id === sessionStorage.getItem('userId') && (
          <div className='w-full text-center mt-2 md:mt-3 mb-2 md:mb-3 flex justify-center gap-2'>
            <button
              className='px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition-colors'
              onClick={() => sendtoEdicion(postUser)}
            >
              Editar Post
            </button>

            <button
              className='px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-50 transition-colors'
              onClick={() => confirmarBorrarBuscoPosts(_id)}
            >
              Eliminar Post
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BuscoPostUser;
