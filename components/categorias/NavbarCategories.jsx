import { useRouter } from 'next/navigation';
import IconoBusqueda from '../productos/iconos/IconoBusqueda';

const NavbarCategories = () => {
  const router = useRouter();

  const handleIconClick = (typeProduct) => {
    console.log(`handleIconClick', typeProduct: ${typeProduct}`);
    router.push(`/productos?busqueda=${typeProduct}&page=0`);
  };

  return (
    <nav className='w-full flex flex-row justify-around items-start gap-4 py-2 mb-4'>
      <IconoBusqueda typeProduct='tablas' handleIconClick={handleIconClick} />
      <IconoBusqueda typeProduct='velas' handleIconClick={handleIconClick} />
      <IconoBusqueda typeProduct='mastiles' handleIconClick={handleIconClick} />
      <IconoBusqueda typeProduct='botavaras' handleIconClick={handleIconClick} />
      <IconoBusqueda typeProduct='accesorios' handleIconClick={handleIconClick} />
      <IconoBusqueda typeProduct='ultimos_productos' handleIconClick={handleIconClick} />
    </nav>
  );
};

export default NavbarCategories;
