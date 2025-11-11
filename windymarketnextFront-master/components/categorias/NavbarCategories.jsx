import { useState } from 'react';
import { useRouter } from 'next/navigation';
import IconoBusqueda from '../productos/iconos/IconoBusqueda';

const NavbarCategories = ({ showNavbar }) => {
  const [showMenu, setShowMenu] = useState(showNavbar);
  const router = useRouter(); // Get the router object

  const handleIconClick = (typeProduct) => {
    router.push(`/productos?busqueda=${typeProduct}&page=0`); // Navigate programmatically
    setShowMenu(false); // Ocultar el menú después de hacer clic en un ícono
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-transparent'>
      <div className='container-fluid justify-content-between'>
        <button className='navbar-toggler' type='button' onClick={toggleMenu}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
          <ul
            className={`navbar-nav w-100 d-flex justify-content-around`}
            style={{ listStyle: 'none', padding: 0 }}
          >
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='tablas' handleIconClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='velas' handleIconClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='mastiles' handleIconClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='botavaras' handleIconClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='accesorios' handleIconClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='ultimos_productos' handleIconClick={handleIconClick} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCategories;
