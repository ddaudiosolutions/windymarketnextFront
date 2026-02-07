import { useRouter } from 'next/navigation';
import IconoBusqueda from '../productos/iconos/IconoBusqueda';

const NavbarCategories = () => {
  const router = useRouter();

  const handleIconClick = (typeProduct) => {
    console.log(`handleIconClick', typeProduct: ${typeProduct}`);
    router.push(`/productos?busqueda=${typeProduct}&page=0`);
  };

  return (
    <div className='w-full'>
      <h3 className='text-center text-slate-600 font-saira text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4'>
        Explora por categorías
      </h3>
      <nav className='w-full flex flex-wrap justify-center items-center gap-3 md:gap-4'>
        <IconoBusqueda typeProduct='tablas' handleIconClick={handleIconClick} />
        <IconoBusqueda typeProduct='velas' handleIconClick={handleIconClick} />
        <IconoBusqueda typeProduct='mastiles' handleIconClick={handleIconClick} />
        <IconoBusqueda typeProduct='botavaras' handleIconClick={handleIconClick} />
        <IconoBusqueda typeProduct='accesorios' handleIconClick={handleIconClick} />
        <IconoBusqueda typeProduct='ultimos_productos' handleIconClick={handleIconClick} />
      </nav>
    </div>
  );
};

export default NavbarCategories;
