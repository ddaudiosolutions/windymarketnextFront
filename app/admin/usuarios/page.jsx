'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAllUsers, impersonarUsuario, obtenerDatosUsuario } from '@/reduxLib/slices/usersSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminUsuariosPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const usuario = useSelector((state) => state.users.user);
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario?.isAdmin) {
      router.replace('/');
      return;
    }
    dispatch(getAllUsers())
      .unwrap()
      .then((res) => setUsuarios(res.data || []))
      .finally(() => setLoading(false));
  }, [dispatch, usuario, router]);

  const handleImpersonar = (userId) => {
    dispatch(impersonarUsuario(userId))
      .unwrap()
      .then((payload) => {
        // Refrescar datos del usuario impersonado
        const impersonadoId = payload.result?.data?.id || payload.result?.data?._id;
        if (impersonadoId) dispatch(obtenerDatosUsuario(impersonadoId));
        router.push('/');
      });
  };

  if (!usuario?.isAdmin) return null;

  const usuariosFiltrados = usuarios.filter((u) => {
    const q = busqueda.toLowerCase();
    return (
      u.nombre?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className='main-container my-4 p-4'>
      <h2 className='font-bold text-2xl font-saira mb-1'>Panel — Usuarios</h2>
      <p className='text-gray-500 text-sm mb-6'>
        Accede como cualquier usuario para reproducir problemas de soporte.
      </p>

      <Input
        placeholder='Buscar por nombre o email...'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className='mb-6 max-w-md'
      />

      {loading ? (
        <p className='text-center text-gray-400 py-12'>Cargando usuarios...</p>
      ) : usuariosFiltrados.length === 0 ? (
        <p className='text-center text-gray-400 py-12'>No se encontraron usuarios.</p>
      ) : (
        <div className='space-y-2'>
          {usuariosFiltrados.map((u) => (
            <div
              key={u._id}
              className='flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 bg-white'
            >
              <div>
                <p className='font-medium text-sm'>{u.nombre}</p>
                <p className='text-gray-500 text-xs'>{u.email}</p>
              </div>
              <Button
                variant='outline'
                size='sm'
                className='border-orange-400 text-orange-500 hover:bg-orange-50 text-xs'
                onClick={() => handleImpersonar(u._id)}
              >
                Acceder como este usuario
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
