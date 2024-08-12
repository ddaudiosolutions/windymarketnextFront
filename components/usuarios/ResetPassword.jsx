'use client';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Field, Form } from 'react-final-form';
import { changePasswordUser } from '../../reduxLib/slices/authSlice';

import Swal from 'sweetalert2';

function ResetPassword({ params }) {
  console.log(params.id);
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    if (values.password !== values.repeatPassword) {
      Swal.fire({
        icon: 'error',
        html: `Las contraseñas no coinciden: <br><br> ${values.password} - ${values.repeatPassword}`,
      });
    } else {
      dispatch(
        changePasswordUser({
          email: values.email,
          password: values.password,
          id: params.id,
        }),
      );
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
            alt='WindyMArket_Logo'
            style={{ width: '20rem', objectFit: 'contain' }}
            className='mx-auto d-block'
          ></img>
        </div>
        <div className='col col-lg-4 col-xl-4 ms-2'>
          <div className='rounded  p-3 bg-transparent'>
            <div className='text-center'>
              <h3 className='loginH3'>Recupera tu Acceso</h3>
            </div>
            <Form
              onSubmit={handleRegister}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='email' className='loginLabel'>
                      Email
                    </label>
                    <Field className='form-control mb-2' name='email' component='input' />
                  </div>
                  <div>
                    <label htmlFor='password' className='loginLabel'>
                      Nuevo Password
                    </label>
                    <Field
                      className='form-control mb-2'
                      name='password'
                      component='input'
                      type='password'
                    />
                  </div>
                  <div>
                    <label htmlFor='repeatPassword' className='loginLabel'>
                      Volver a escribir Nuevo Password
                    </label>
                    <Field
                      className='form-control mb-2'
                      name='repeatPassword'
                      component='input'
                      type='password'
                    />
                  </div>
                  {/*      <pre className='bg-success'>{JSON.stringify(values, 0, 2)}</pre> */}
                  <div className='form-group text-center'>
                    <button className='btn btn-outline-info btn-block '>Cambiar Password</button>
                  </div>
                </form>
              )}
            />
            <div className='row mt-4'>
              <Link href={'/login'} className='col-md-6'>
                Inicia Sesion
              </Link>
              <Link href={'/nuevousuario'} className='col-md-6'>
                Registrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
