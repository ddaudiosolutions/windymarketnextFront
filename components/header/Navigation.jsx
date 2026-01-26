'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerDatosUsuario } from '../../reduxLib/slices/usersSlice';
import { jwtDecode } from 'jwt-decode';
import { cargarProductosAuthor } from "../../helpers/utils";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [userId, setUserId] = useState('');
  const [userTokenCheck, setUserTokenCheck] = useState(null);

  const logOut = useCallback(() => {
    // Limpiar sessionStorage
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userToken');
    // Resetear estados
    setNombreUsuario('');
    setUserId('');
    setUserTokenCheck(null);
    // Redirigir a home
    router.push('/');
  }, [router]);

  useEffect(() => {
    // Cargar datos del sessionStorage cada vez que cambia la ruta
    const nombreUser = sessionStorage.getItem('userName');
    const userIdStorage = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');

    // Cargar user en Redux si hay sesión pero no está en Redux
  if (userIdStorage && !user) {
    dispatch(obtenerDatosUsuario(userIdStorage));
  }

    setNombreUsuario(nombreUser);
    setUserId(userIdStorage);
    setUserTokenCheck(userToken);

    // Validar expiración del token
    if (userToken) {
      try {
        const { exp } = jwtDecode(userToken);
        const expiredToken = exp * 1000 - 60000; // 1 minuto de margen
        const currentTime = Date.now();

        if (expiredToken < currentTime) {
          // Token expirado, cerrar sesión
          logOut();
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
        logOut();
      }
    }
  }, [pathname, logOut]); // Ejecutar cada vez que cambia la ruta

  console.log('userTokenCheck', userTokenCheck);
  return (
    <>
      <nav className='nav-flex flex items-center justify-between bg-white px-4 py-2 border-b'>
        <div>
          <Image
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo windsurf segunda mano'
            className='cursor-pointer'
            width='128'
            height='72'
            onClick={() => router.push('/')}
          />
        </div>
        <div className='ml-auto flex items-center gap-4'>
          {userTokenCheck === null ? (
            <Fragment>
              {/* <div className='ml-auto flex items-center gap-4'> */}
                <Link href={'/login'} className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider no-underline'>
                  Login
                </Link>
                <Link href={'/nuevousuario'} className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider no-underline'>
                  Registrarse
                </Link>
              {/* </div> */}
            </Fragment>
          ) : (
            <Fragment>
              {/* <div className='text-center'> */}
                {/* <div className='ml-auto flex items-center gap-4'> */}
                  <h5 className='font-saira-stencil text-windy-cyan text-sm mb-0'>
                    Bienvenid@ {nombreUsuario}
                  </h5>

                {/* </div> */}

                {/* <div className='flex justify-center'> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        /* className="border-windy-red text-windy-red hover:bg-windy-red hover:text-white font-saira text-sm" */
                      >
                        Mi Cuenta
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href={'/productos/nuevo'} className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider cursor-pointer no-underline'>
                          Subir Producto
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={'/buscoposts/nuevo'} className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider cursor-pointer no-underline'>
                          Publicar Busqueda
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/productos/auth/${userId}`}
                          className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider cursor-pointer no-underline'
                          onClick={() =>
                            cargarProductosAuthor(dispatch, router, {
                              author: { _id: userId },
                            })
                          }
                        >
                          Mis Productos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/productos/favoritos/`} className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider cursor-pointer no-underline'>
                          Favoritos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/usuarios/${userId}`} className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider cursor-pointer no-underline'>
                          Mi perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='font-saira-stencil text-windy-cyan hover:text-windy-red text-sm tracking-wider cursor-pointer'
                        onClick={logOut}
                      >
                        LogOut
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               {/*  </div> */}
              {/* </div> */}
            </Fragment>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
