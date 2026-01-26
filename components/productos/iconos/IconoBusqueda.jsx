function IconoBusqueda({ typeProduct, handleIconClick }) {
  let icono;
  switch (typeProduct) {
    case 'tablas':
      icono = '/iconosCategorias/table_windsurf.png';
      break;
    case 'velas':
      icono = '/iconosCategorias/windsurf_sail.jpg';
      break;
    case 'mastiles':
      icono = '/iconosCategorias/mast_sail.jpg';
      break;
    case 'botavaras':
      icono = '/iconosCategorias/boom_sail.jpg';
      break;
    case 'accesorios':
      icono = '/iconosCategorias/Accesorios_Windsurf.png';
      break;
    case 'ultimos_productos':
      icono = './iconosCategorias/windsurf_pack.jpg';
      break;
    default:
      icono = '/iconosCategorias/Avatar_Default.png';
      break;
  }
  return (
    <div className='flex flex-col items-center cursor-pointer' onClick={() => handleIconClick(typeProduct)}>
      <img className='w-[60px] h-[60px] object-contain' src={icono} alt={typeProduct} />
      <h6 className='text-sm mt-1 font-saira'>{typeProduct}</h6>
    </div>
  );
}

export default IconoBusqueda;
