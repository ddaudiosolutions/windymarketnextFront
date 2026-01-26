'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { nuevoUsuario } from '@/reduxLib/slices/usersSlice';
import { Field, Form } from 'react-final-form';
import Swal from 'sweetalert2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// REGISTRO DE USUARIO EN LA BASE DE DATOS DE MONGO
const CrearUsuario = () => {
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    if (values.doublePassword === values.password) {
      if (values.password.length >= 6) {
        dispatch(
          nuevoUsuario({ nombre: values.nombre, email: values.email, password: values.password })
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
      <div className='flex justify-center mt-12'>
        <div className='w-full max-w-md lg:max-w-lg'>
          <img
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo windymarket windsurf segunda mano'
            className='w-80 object-contain mx-auto block'
          ></img>
        </div>
        <div className='w-full max-w-md lg:max-w-lg ml-4'>
          <div className='rounded  p-3 bg-transparent'>
            <div className='text-center'>
              <h3 className='font-saira text-2xl mb-4'>Registrarse</h3>
            </div>
            <Form
              onSubmit={handleRegister}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <Label htmlFor='nombre' className='mt-1'>
                      Nombre
                    </Label>
                    <Field name='nombre'>
                      {({ input }) => <Input {...input} id='nombre' className='mt-1' />}
                    </Field>
                  </div>
                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Field name='email'>
                      {({ input }) => <Input {...input} id='email' type='email' className='mt-1' />}
                    </Field>
                  </div>
                  <div>
                    <Label htmlFor='password'>
                      Password
                    </Label>
                    <Field name='password'>                     
                       {({ input }) => <Input {...input} id='password' type='password' className='mt-1' />}
                    </Field>
                  </div>
                  <div>
                    <Label htmlFor='doublePassword'>Repetir Password</Label>
                    <Field name='doublePassword'>
                      {({ input }) => <Input {...input} id='doublePassword' type='password' className='mt-1' />}
                    </Field>
                  </div>                  
                  <div className='text-center'>
                    <Button type='submit' variant='outline' className='w-full mt-3'>
                      Registrarse
                    </Button>
                  </div>
                </form>
              )}
            />
            <div className='grid grid-cols-2 gap-4 mt-4'>
              <Link href='/login' className='text-windy-cyan hover:underline'>
                Inicia Sesion
              </Link>
              <Link href='/forgotpassword' className='text-windy-cyan hover:underline'>
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
