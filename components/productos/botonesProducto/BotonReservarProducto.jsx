'use client';

import { BsBookmarkCheck } from 'react-icons/bs';

const BotonReservarProducto = (props) => {
  return (
    <BsBookmarkCheck
      className=''
      style={{ color: props.reservado && '38D9DF', fontSize: '2.2rem' }}
      onClick={() => {
        props.setReservado(!props.reservado);
        props.handleReservado();
      }}
    />
  );
};

export default BotonReservarProducto;
