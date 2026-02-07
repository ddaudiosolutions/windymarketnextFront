function IconoBusqueda({ typeProduct, handleIconClick }) {
  let label;

  switch (typeProduct) {
    case 'tablas':
      label = 'Tablas';
      break;
    case 'velas':
      label = 'Velas';
      break;
    case 'mastiles':
      label = 'Mástiles';
      break;
    case 'botavaras':
      label = 'Botavaras';
      break;
    case 'accesorios':
      label = 'Accesorios';
      break;
    case 'ultimos_productos':
      label = 'Últimos';
      break;
    default:
      label = typeProduct;
      break;
  }

  return (
    <button
      onClick={() => handleIconClick(typeProduct)}
      className='px-4 py-2 md:px-6 md:py-2.5 rounded-lg border-2 border-windy-cyan/30 bg-windy-cyan/1 hover:bg-windy-cyan/10 hover:border-windy-cyan/20 transition-all duration-200 font-saira text-xs md:text-sm font-normal text-slate-800 hover:text-slate-900 shadow-md hover:shadow-lg'
    >
      {label}
    </button>
  );
}

export default IconoBusqueda;
