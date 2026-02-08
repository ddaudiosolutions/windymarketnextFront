import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { BsEyeFill } from 'react-icons/bs';

const VistasProducto = () => {
  const numeroVistas = useSelector((state) => state.products.productViews);

  // Si no hay datos de vistas todavía, mostrar 0
  const vistas = numeroVistas || 0;

  return (
    <>
      <div className='ms-2'>
        <BsEyeFill />
      </div>
      <h6 className='ms-2 mt-1'>{vistas}</h6>
    </>
  );
};

export default memo(VistasProducto);
