'use client';

import { BsCoin } from 'react-icons/bs';

const BotonVendidoProducto = (props) => {
  return (
    <BsCoin
      className='text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform'
      style={{ color: props.vendido && '38D9DF' }}
      onClick={() => {
        props.setVendido(!props.vendido);
        props.handleVendido();
      }}
    />
  );
};

export default BotonVendidoProducto;
