'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarUsuario } from '@/reduxLib/slices/usersSlice';
import Swal from 'sweetalert2';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Usuario = () => {
  const dispatch = useDispatch();
  const datosUsuario = useSelector((state) => state.users.user);

  if (!datosUsuario) {
    return (
      <div className='flex justify-center py-20 text-muted-foreground'>
        Cargando datos del usuario…
      </div>
    );
  }

  const confirmarBorrarUsuario = (_id) => {
    Swal.fire({
      title: '¿Seguro quieres eliminar?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar usuario',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarUsuario(_id));
      }
    });
  };

  return (
    <Fragment>
      <div className='mx-auto mt-6 max-w-xl text-center'>
        <h3 className='text-2xl font-semibold'>
          Datos de <span className='text-primary'>{datosUsuario.nombre}</span>
        </h3>
      </div>

      <Card className='mx-auto mt-6 max-w-xl'>
        <CardHeader className='items-center'>
          <img
            src={datosUsuario.imagesAvatar?.[0]?.url || '/Avatar_Default2.png'}
            alt='Avatar usuario'
            className='h-28 w-28 rounded-full object-cover shadow'
          />
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Nombre */}
          <div>
            <Label>Nombre</Label>
            <p className='mt-1 rounded-md border px-3 py-2 text-sm'>{datosUsuario.nombre}</p>
          </div>

          {/* Email */}
          <div>
            <Label>E-mail</Label>
            <p className='mt-1 rounded-md border px-3 py-2 text-sm'>{datosUsuario.email}</p>
          </div>

          {/* Teléfono */}
          <div className='space-y-2'>
            <div>
              <Label>Teléfono</Label>
              <p className='mt-1 rounded-md border px-3 py-2 text-sm'>{datosUsuario.telefono}</p>
            </div>

            <div className='flex items-center gap-3'>
              <Switch checked={datosUsuario.showPhone} disabled />
              <span className='text-sm text-muted-foreground'>Ocultar teléfono</span>
            </div>
          </div>

          {/* Dirección */}
          <div>
            <Label>Dirección</Label>
            <p className='mt-1 rounded-md border px-3 py-2 text-sm'>{datosUsuario.direccion}</p>
          </div>

          {/* Población */}
          <div>
            <Label>Población y CP</Label>
            <p className='mt-1 rounded-md border px-3 py-2 text-sm'>{datosUsuario.poblacion_CP}</p>
          </div>

          {/* Acciones */}
          <div className='flex flex-col gap-3 pt-4'>
            <Button asChild variant='outline'>
              <Link href={`/usuarios/editar/${datosUsuario._id}`}>Editar usuario</Link>
            </Button>

            <Button variant='destructive' onClick={() => confirmarBorrarUsuario(datosUsuario._id)}>
              Eliminar usuario
            </Button>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Usuario;
