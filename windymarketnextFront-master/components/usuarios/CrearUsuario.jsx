'use client';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { nuevoUsuario } from '../../reduxLib/slices/usersSlice';
import { Field, Form } from 'react-final-form';
import Swal from 'sweetalert2';

// REGISTRO DE USUARIO EN LA BASE DE DATOS DE MONGO
const CrearUsuario = () => {
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    if (values.doublePassword === values.password) {
      if (values.password.length >= 6) {
        dispatch(
          nuevoUsuario({ nombre: values.nombre, email: values.email, password: values.password }),
        );
      } else {
        Swal.fire({
          icon: 'error',
          html: 'La contraseña debe tener al menos 6 caracteres',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        html: `Las contraseñas no coinciden: <br><br> ${values.password} - ${values.doublePassword}`,
      });
    }
  };
  // eslint-disable-next-line
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return (
    <div className=' '>
      <div className=' row justify-content-center' style={{ marginTop: '50px' }}>
        <div className='col col-lg-4 col-xl-4 '>
          <img
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo windymarket windsurf segunda mano'
            style={{ width: '20rem', objectFit: 'contain' }}
            className='mx-auto d-block'
          ></img>
        </div>
        <div className='col col-lg-4 col-xl-4 ms-2'>
          <div className='rounded  p-3 bg-transparent'>
            <div className='text-center'>
              <h3 className='loginH3'>Registrarse</h3>
            </div>
            <Form
              onSubmit={handleRegister}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='nombre' className='loginLabel'>
                      Nombre
                    </label>
                    <Field className='form-control mb-2' name='nombre' component='input' />
                  </div>
                  <div>
                    <label htmlFor='email' className='loginLabel'>
                      Email
                    </label>
                    <Field className='form-control mb-2' name='email' component='input' />
                  </div>
                  <div>
                    <label htmlFor='password' className='loginLabel'>
                      Password
                    </label>
                    <Field
                      className='form-control mb-2'
                      name='password'
                      component='input'
                      type='password'
                    />
                  </div>
                  <div>
                    <label htmlFor='doublePassword' className='loginLabel'>
                      Repetir Password
                    </label>
                    <Field
                      className='form-control mb-2'
                      name='doublePassword'
                      component='input'
                      type='password'
                    />
                  </div>
                  {/* <pre className='bg-success'>{JSON.stringify(values, 0, 2)}</pre> */}
                  <div className='form-group text-center'>
                    <button className='btn btn-outline-info btn-block '>Registrarse</button>
                  </div>
                </form>
              )}
            />
            <div className='row mt-4'>
              <Link href={'/login'} className='col-md-6'>
                Inicia Sesion
              </Link>
              <Link href={'/forgotpassword'} className='col-md-6'>
                Olvidé mi Contraseña
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearUsuario;
