'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; /*
import { cargarProductosAuthor } from "../helpers/utils"; */
import Image from 'next/image';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [nombreUsuario, setNombreUsuario] = useState('');
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
      <nav className='mt-2 bg-nav  d-flex align-items-end '>
        <div className='container-fluid col-md '>
          <Image
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo windsurf segunda mano'
            className='navbar-brand ms-4 mt-2 mb-2'
            width='128'
            height='72'
            onClick={() => router.push('/')}
          />
        </div>
        <div className=' me-4 mb-3'>
          {userTokenCheck === null ? (
            <Fragment>
              <div className='d-flex '>
                <Link href={'/login'} className='nav-link typeHeader '>
                  Login
                </Link>
              </div>
              <div className='d-flex'>
                <Link href={'/nuevousuario'} className='nav-link typeHeader '>
                  Registrarse
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className=''>
                <div className='container text-center'>
                  <div className='d-flex justify-content-center'>
                    <h5 className='typeHeader mt-3 '>Bienvenid@ {nombreUsuario}</h5>
                  </div>

                  <div className='d-flex justify-content-center'>
                    <button
                      type='button'
                      className='btn btn-outline-primary ms-1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      Mi Cuenta
                    </button>
                    <ul className='dropdown-menu'>
                      <li>
                        <Link href={'/productos/nuevo'} className='nav-link typeHeader'>
                          Subir Producto
                        </Link>
                      </li>
                      <li>
                        <Link href={'/buscoposts/nuevo'} className='nav-link typeHeader'>
                          Publicar Busqueda
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/productos/auth/${userId}`}
                          className='nav-link  typeHeader'
                          onClick={() =>
                            /* cargarProductosAuthor(dispatch, history, {
                              author: { _id: userId },
                            }) */
                            alert('cargar productos author')
                          }
                        >
                          Mis Productos
                        </Link>
                      </li>
                      <li>
                        <Link href={`/productos/favoritos/`} className='nav-link  typeHeader'>
                          Favoritos
                        </Link>
                      </li>
                      <li>
                        <Link href={`/usuarios/${userId}`} className='nav-link typeHeader'>
                          Mi perfil
                        </Link>
                      </li>
                      <li
                        type='button'
                        className='nav-link typeHeader'
                        onClick={logOut}
                      >
                        LogOut
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
