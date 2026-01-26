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
      .then((res) => {
        if (res.payload.status === 200) {
          router.push('/');
        }
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
      <div className='flex justify-center mt-12'>
        <div className='w-full max-w-md lg:max-w-lg'>
          <img
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo'
            style={{ width: '20rem', objectFit: 'contain' }}
            className='mx-auto d-block'
          ></img>
        </div>
        <div className='w-full max-w-md lg:max-w-lg ml-4'>
          <div className='rounded m-3 bg-transparent'>
            <div className='text-center'>
              <h3 className='loginH3'>Acceso Usuarios</h3>
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
                      <div>
                        <Label>Email</Label>
                        <Input {...input} id='email' type='email' className='mt-1' />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span className='error'>{meta.error || meta.submitError}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ input, meta }) => (
                      <div>
                        <Label>Password</Label>
                        <Input {...input} type='password' className='mt-1' />
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                  {submitError && <div className='error'>{submitError}</div>}
                  <div className='form-group text-center'>
                    <Button
                      type='submit' variant='outline' className='w-full mt-3'
                      disabled={loading}
                      onClick={trackLoginButton}
                    >
                      {loading && <span className='spinner-border spinner-border-sm'></span>}
                      <span>Login</span>
                    </Button>
                  </div>
                  {/*    <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </form>
              )}
            />

            <div className='grid grid-cols-2 gap-4 mt-4'>
              <Link href={'/nuevousuario'} className='text-windy-cyan hover:underline'>
                Registrate
              </Link>
              <Link href={'/forgotpassword'} className='text-windy-cyan hover:underline'>
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
