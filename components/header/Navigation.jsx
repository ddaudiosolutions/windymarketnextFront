'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearUser } from '../../reduxLib/slices/usersSlice';
import { cargarProductosAuthor } from '../../helpers/utils';

const Navigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const logOut = () => {
    dispatch(clearUser());
    router.replace('/');
  };

  return (
    <nav className='flex items-center justify-between bg-white px-4 py-2 border-b'>
      <Image
        src='/LOGO_CIRCULAR_SIN_FONDO.png'
        alt='WindyMarket logo'
        width={128}
        height={72}
        className='cursor-pointer'
        onClick={() => router.push('/')}
      />

      <div className='ml-auto flex items-center gap-4'>
        {!user ? (
          <>
            <Link href='/login' className='text-sm no-underline'>
              Login
            </Link>
            <Link href='/nuevousuario' className='text-sm no-underline'>
              Registrarse
            </Link>
          </>
        ) : (
          <>
            <h5 className='text-sm'>Bienvenid@ {user.nombre}</h5>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Mi Cuenta</Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href='/productos/nuevo'>Subir Producto</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href='/buscoposts/nuevo'>Publicar Búsqueda</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href={`/productos/auth/${user._id}`}
                    onClick={() =>
                      cargarProductosAuthor(dispatch, router, {
                        author: { _id: user._id },
                      })
                    }
                  >
                    Mis Productos
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href='/productos/favoritos'>Favoritos</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={`/usuarios/${user._id}`}>Mi perfil</Link>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={logOut}>LogOut</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
