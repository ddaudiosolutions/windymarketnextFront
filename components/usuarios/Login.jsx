'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Field, Form } from 'react-final-form';
import './Usuarios.nodemodule.css';
import { loginUsuario } from '@/reduxLib/slices/usersSlice';
import { trackLoginButton } from '../../helpers/analyticsCalls';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const submitLogin = (values) => {
    setLoading(true);

    dispatch(loginUsuario({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Error en login:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              <h3 className='loginH3 text-lg md:text-xl'>Acceso Usuarios</h3>
            </div>
            <Form
              onSubmit={submitLogin}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                }
                if (!values.password) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              render={({ submitError, handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Field name='email'>
                    {({ input, meta }) => (
                      <div className='mb-3 md:mb-4'>
                        <Label className='text-sm md:text-base'>Email</Label>
                        <Input {...input} id='email' type='email' className='mt-1 text-sm md:text-base' />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span className='error text-xs md:text-sm'>{meta.error || meta.submitError}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ input, meta }) => (
                      <div className='mb-3 md:mb-4'>
                        <Label className='text-sm md:text-base'>Password</Label>
                        <Input {...input} type='password' className='mt-1 text-sm md:text-base' />
                        {meta.error && meta.touched && <span className='error text-xs md:text-sm'>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                  {submitError && <div className='error'>{submitError}</div>}
                  <div className='text-center'>
                    <Button
                      type='submit'
                      variant='outline'
                      className='w-full mt-2 md:mt-3 text-sm md:text-base'
                      disabled={loading}
                      onClick={trackLoginButton}
                    >
                      {loading && (
                        <span className='inline-block h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] mr-2'></span>
                      )}
                      <span>Login</span>
                    </Button>
                  </div>
                  {/*    <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </form>
              )}
            />

            <div className='grid grid-cols-2 gap-2 md:gap-4 mt-3 md:mt-4'>
              <Link href={'/nuevousuario'} className='text-windy-cyan hover:underline text-xs md:text-sm'>
                Registrate
              </Link>
              <Link href={'/forgotpassword'} className='text-windy-cyan hover:underline text-xs md:text-sm text-right'>
                Olvidé mi Contraseña
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
