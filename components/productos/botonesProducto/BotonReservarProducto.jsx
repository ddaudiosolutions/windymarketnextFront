'use client';

import { BsBookmarkCheck } from 'react-icons/bs';

const BotonReservarProducto = (props) => {
  return (
    <BsBookmarkCheck
      className='text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform'
      style={{ color: props.reservado && '38D9DF' }}
      onClick={() => {
        props.setReservado(!props.reservado);
        props.handleReservado();
      }}
    />
  );
};

export default BotonReservarProducto;
