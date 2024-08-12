'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { cargarProductosAuthor } from '../../helpers/utils';
import Image from 'next/image';
import { getToken, removeToken, getUserId, getUserName } from '../../helpers/utils';

const Navigation = () => {
  const router = useRouter();
  const date = Date.now();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [userId, setUserId] = useState('');
  const [userTokenCheck, setUserTokenCheck] = useState(null);

  const logOut = (event) => {
    /*  event.stopPropagation(); */ // Detener la propagación del evento
    removeToken();
    setNombreUsuario('');
    setUserId('');
    setUserTokenCheck(null);
    router.push('/');
  };

  useEffect(() => {
    const userTokenCheck = getToken();
    setUserTokenCheck(userTokenCheck);

    if (userTokenCheck) {
      const { exp } = jwtDecode(userTokenCheck);
      const expiredToken = exp * 1000 - 60000;
      if (expiredToken < date) {
        logOut();
      } else {
        const getUserIdToken = getUserId();
        const getUserNameToken = getUserName();
        setNombreUsuario(getUserNameToken);
        setUserId(getUserIdToken);
      }
    }
  }, [userTokenCheck, date]);

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
          {userTokenCheck === null || userTokenCheck === undefined ? (
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
                      className='btn btn-outline-primary ms-1 dropdown-toggle'
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
                        <Link href={`/productos/auth/${userId}`} className='nav-link  typeHeader'>
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
                        style={{ cursor: 'pointer' }} // Asegurar que el cursor sea un puntero
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
