'use client';

import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarUsuario, obtenerDatosUsuario} from '@/reduxLib/slices/usersSlice';
import './Usuario.css';
import Swal from 'sweetalert2';

const Usuario = () => {
  const dispatch = useDispatch();
  const datosUsuario = useSelector((state) => state.users.user);
  /* if (!datosUsuario) return null; */
  // ✅ Cargar datos del usuario al montar el componente
  // ✅ useEffect ANTES del return
  useEffect(() => {
    // Obtener userId solo en el cliente para el dispatch
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;
    
    if (!datosUsuario && userId) {
      dispatch(obtenerDatosUsuario(userId));
    }
  }, [dispatch, datosUsuario]);
  console.log('datosUsuario', datosUsuario)

  // ✅ Ahora el return con loading
  if (!datosUsuario) {
    return (
      <div className='container text-center mt-5'>
        <p>Cargando datos del usuario...</p>
      </div>
    );
  }
  const confirmarBorrarUsuario = (_id) => {
    Swal.fire({
      title: 'Seguro quieres eliminar ?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Usuario!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarUsuario(_id));
        /* logOut(); */
      }
    });
  };

  return (
    <Fragment>
      <div className='row col-10 rotulo mx-auto text-center justify-content-center mt-3'>
        <h3 className='loginH3Us'>Datos de {datosUsuario.nombre}</h3>
      </div>
      <div className='card1 col-10 mx-auto'>
        <div className='row justify-content-center'>
          <div className='col col-lg-4 col-xl-4 ms-2'>
            <div className='rounded m-3 bg-transparent'>
              <div className='row form-group mb-2'>
                <label className='loginLabel'>Nombre</label>
                <div data-cy='nombre' type='text' className='form-control'>
                  {datosUsuario.nombre}
                </div>
              </div>
              <div className='row  form-group mb-2'>
                <label className='loginLabel' htmlFor='username'>
                  E-mail
                </label>
                <div data-cy='email' type='text' className='form-control'>
                  {datosUsuario.email}
                </div>
              </div>
              <div className='row form-group mb-2'>
                <label className='loginLabel'>Teléfono</label>
                <div data-cy='telefono' type='text' className='form-control'>
                  {datosUsuario.telefono}
                </div>
                <div className='form-group'>
                  <label htmlFor='showPhone'>Ocultar Teléfono</label>
                  <input
                    type='checkbox' // Asegúrate de especificar el tipo de input
                    className='form-check-input ms-3'
                    role='switch'
                    checked={datosUsuario.showPhone} // Establece el estado del switch según showPhone
                    disabled={true} // Deshabilita el input para evitar cambios
                  />
                </div>
              </div>
              <div className='row form-group mb-2'>
                <label className='loginLabel'>Dirección</label>
                <div data-cy='direccion' type='text' className='form-control'>
                  {datosUsuario.direccion}
                </div>
              </div>
              <div className='row form-group mb-2'>
                <label className='loginLabel'>Poblacion y CP</label>
                <div data-cy='direccion' type='text' className='form-control'>
                  {datosUsuario.poblacion_CP}
                </div>
              </div>
              <div className='text-center'>
                {datosUsuario.imagesAvatar[0].url === undefined ? (
                  <img
                    src='/Avatar_Default2.png'
                    className='card-img-topAvatar ms-4 mt-3'
                    alt='avatar para User'
                  ></img>
                ) : (
                  <img
                    src={datosUsuario.imagesAvatar[0].url}
                    className='card-img-topAvatar mt-3 mb-3'
                    alt='avatar for User'
                  ></img>
                )}
              </div>
              <div className='row text-center'>
                <Link href={`/usuarios/editar/${datosUsuario._id}`} className='nav-link typeHeader'>
                  Editar
                </Link>
              </div>
              <div className='row justify-content-center mt-3 bg-primary'>
                <button
                  className='nav-link typeHeader rounded'
                  onClick={() => confirmarBorrarUsuario(datosUsuario._id)}
                >
                  Eliminar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Usuario;
