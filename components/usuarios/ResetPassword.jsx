'use client';

import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Field, Form } from 'react-final-form';
import { changePasswordUser } from '@/reduxLib/slices/authSlice';
import Swal from 'sweetalert2';

function ResetPassword({ resetId }) {
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
          id: resetId,
        })
      );
    }
  };
  // eslint-disable-next-line
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return (
    <div className=''>
      <div className='flex flex-col md:flex-row justify-center items-center md:items-start mt-6 md:mt-12 px-4 gap-4'>
        <div className='w-full max-w-xs md:max-w-md lg:max-w-lg'>
          <img
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo'
            className='w-48 md:w-64 lg:w-80 mx-auto block object-contain'
          ></img>
        </div>
        <div className='w-full max-w-md lg:max-w-lg'>
          <div className='rounded mx-2 md:m-3 bg-transparent'>
            <div className='text-center mb-4 md:mb-6'>
              <h3 className='loginH3 text-lg md:text-xl'>Recupera tu Acceso</h3>
            </div>
            <Form
              onSubmit={handleRegister}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className='mb-3 md:mb-4'>
                    <label htmlFor='email' className='loginLabel block mb-2 text-sm md:text-base'>
                      Email
                    </label>
                    <Field
                      className='w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                      name='email'
                      component='input'
                    />
                  </div>
                  <div className='mb-3 md:mb-4'>
                    <label htmlFor='password' className='loginLabel block mb-2 text-sm md:text-base'>
                      Nuevo Password
                    </label>
                    <Field
                      className='w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                      name='password'
                      component='input'
                      type='password'
                    />
                  </div>
                  <div className='mb-3 md:mb-4'>
                    <label htmlFor='repeatPassword' className='loginLabel block mb-2 text-sm md:text-base'>
                      Volver a escribir Nuevo Password
                    </label>
                    <Field
                      className='w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                      name='repeatPassword'
                      component='input'
                      type='password'
                    />
                  </div>
                  {/*      <pre className='bg-success'>{JSON.stringify(values, 0, 2)}</pre> */}
                  <div className='text-center'>
                    <button className='w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-saira'>
                      Cambiar Password
                    </button>
                  </div>
                </form>
              )}
            />
            <div className='grid grid-cols-2 gap-2 md:gap-4 mt-3 md:mt-4'>
              <Link href='/login' className='text-windy-cyan hover:underline text-xs md:text-sm'>
                Inicia Sesion
              </Link>
              <Link href='/nuevousuario' className='text-windy-cyan hover:underline text-xs md:text-sm text-right'>
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
