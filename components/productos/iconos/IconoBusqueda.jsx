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
      className='px-3 py-2 md:px-5 md:py-2.5 rounded-full border border-gray-300 bg-white hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-200 font-saira text-xs md:text-sm font-medium text-gray-700 hover:text-cyan-600 shadow-sm hover:shadow-md'
    >
      {label}
    </button>
  );
}

export default IconoBusqueda;
