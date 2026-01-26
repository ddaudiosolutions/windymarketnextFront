'use client';

import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';
import { editarDatosUsuario } from '../../reduxLib/slices/usersSlice';
import { Field, Form } from 'react-final-form';
import Swal from 'sweetalert2';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const EditarUser = () => {
  const dispatch = useDispatch();
  const datosUsuarioEditar = useSelector((state) => state.users.user);

  const validateTelefono = (value) => {
    const telefonoRegex = /^(?:\+\d{1,3})?\d{6,9}$/;
    return telefonoRegex.test(value);
  };

  const submitEditarUsuario = (values) => {
    if (!validateTelefono(values.telefono)) {
      Swal.fire('Error', 'Introduce un numero de telefono válido', 'error');
      return;
    }

    const formData = new FormData();
    formData.set('nombre', values.nombre);
    formData.set('email', values.email);
    formData.set('telefono', values.telefono);
    formData.set('showPhone', values.showPhone || false);
    formData.set('direccion', values.direccion || '');
    formData.set('poblacion_CP', values.poblacion_CP || '');
    formData.set('imagesAvatar', values.imagesAvatar);

    dispatch(editarDatosUsuario({ formData, id: datosUsuarioEditar._id }));
  };

  return (
    <Fragment>
      <div className='mx-auto mt-6 max-w-xl text-center'>
        <h3 className='text-2xl font-semibold'>
          Edita tus datos <span className='text-primary'>{datosUsuarioEditar.nombre}</span>
        </h3>
      </div>

      <div className='mx-auto mt-6 max-w-xl rounded-xl border bg-background p-6 shadow-sm'>
        <Form
          onSubmit={submitEditarUsuario}
          initialValues={{
            nombre: datosUsuarioEditar.nombre,
            email: datosUsuarioEditar.email,
            telefono: datosUsuarioEditar.telefono,
            showPhone: datosUsuarioEditar.showPhone,
            direccion: datosUsuarioEditar.direccion,
            poblacion_CP: datosUsuarioEditar.poblacion_CP,
            imagesAvatar: datosUsuarioEditar.imagesAvatar?.[0]?.url,
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Nombre */}
              <div className='space-y-1'>
                <Label htmlFor='nombre'>Nombre</Label>
                <Field name='nombre'>{({ input }) => <Input {...input} />}</Field>
              </div>

              {/* Email */}
              <div className='space-y-1'>
                <Label htmlFor='email'>E-mail</Label>
                <Field name='email'>{({ input }) => <Input {...input} type='email' />}</Field>
              </div>

              {/* Teléfono */}
              <div className='space-y-1'>
                <Label htmlFor='telefono'>Teléfono</Label>
                <Field name='telefono'>{({ input }) => <Input {...input} />}</Field>

                <Field name='showPhone' type='checkbox'>
                  {({ input }) => (
                    <div className='flex items-center gap-3 pt-2'>
                      <Switch
                        checked={input.checked}
                        onCheckedChange={input.onChange}
                        id='showPhone'
                      />
                      <Label htmlFor='showPhone' className='text-sm'>
                        Ocultar teléfono
                      </Label>
                    </div>
                  )}
                </Field>
              </div>

              {/* Dirección */}
              <div className='space-y-1'>
                <Label htmlFor='direccion'>Dirección</Label>
                <Field name='direccion'>{({ input }) => <Input {...input} />}</Field>
              </div>

              {/* Población */}
              <div className='space-y-1'>
                <Label htmlFor='poblacion_CP'>Población y Código Postal</Label>
                <Field name='poblacion_CP'>{({ input }) => <Input {...input} />}</Field>
              </div>

              {/* Avatar */}
              <div className='space-y-1'>
                <Label htmlFor='imagesAvatar'>Avatar</Label>
                <Field name='imagesAvatar'>
                  {({ input }) => (
                    <Input type='file' onChange={(e) => input.onChange(e.target.files[0])} />
                  )}
                </Field>
              </div>

              {/* Botón */}
              <div className='pt-4 text-center'>
                <Button type='submit' className='w-full'>
                  Editar usuario
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    </Fragment>
  );
};

export default EditarUser;
