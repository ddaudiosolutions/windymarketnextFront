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
      <div className='col'>
        <div
          className='shadow-sm me-1 ms-1 '
          type='button'
          onClick={() => verBuscoPostId(postUser)}
        >
          <div className='card shadow-sm me-1 ms-1 mt-4'>
            <img
              src='/SE_BUSCA_LOGO.png'
              className='card-img-top-post'
              alt='SE_BUSCA_IMG windsuf windymarket segunda mano'
            ></img>

            <div className='card-body'>
              <h5 className='titleH5-post card-title text-center'>{title}</h5>
            </div>
          </div>
        </div>
        {postUser.author._id === sessionStorage.getItem('userId') && (
          <div className='container-fluid text-center mt-3 mb-3 gap-2'>
            <button
              className='btn btn-outline-success me-2'
              onClick={() => sendtoEdicion(postUser)}
            >
              Editar Post
            </button>

            <button
              className='btn btn-outline-warning '
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
