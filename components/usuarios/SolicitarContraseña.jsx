'use client';

import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Field, Form } from 'react-final-form';
import { resetPassword } from '@/reduxLib/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function SolicitarContraseña() {
  const dispatch = useDispatch();
  const handleRegister = (values) => {
    console.log('🔵 handleRegister ejecutado');
    console.log('📧 Email recibido:', values.email);
    console.log('📦 Despachando resetPassword...');
    dispatch(resetPassword(values.email));
  };
  // eslint-disable-next-line
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return (
    <div className=' '>
      <div className='flex justify-center mt-12'>
        <div className='w-full max-w-md lg:max-w-lg'>
          <img
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMarket_Logo windymarket windsurf segunda mano'
            className='w-80 object-contain mx-auto block'
          />
        </div>
        <div className='w-full max-w-md lg:max-w-lg ml-4'>
          <div className='rounded  p-3 bg-transparent'>
            <div className='text-center'>
              <h3 className='font-saira text-2xl mb-4'>Recupera tu Acceso</h3>
            </div>
            <Form
              onSubmit={handleRegister}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit} className='space-y-4'>
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

                  <div className='text-center'>
                    <Button type='submit' variant='outline' className='w-full mt-3'>
                      Solicitar Cambio
                    </Button>
                  </div>
                </form>
              )}
            />
            <div className='grid grid-cols-2 gap-4 mt-4'>
              <Link href='/login' className='text-windy-cyan hover:underline'>
                Inicia Sesion
              </Link>
              <Link href='/nuevousuario' className='text-windy-cyan hover:underline'>
                Registrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitarContraseña;
