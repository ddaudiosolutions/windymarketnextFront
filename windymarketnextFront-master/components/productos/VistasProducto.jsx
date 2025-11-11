import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { BsEyeFill } from 'react-icons/bs';

const VistasProducto = () => {
  const numeroVistas = useSelector((state) => state.products.productViews);
  return (
    <>
      <div className='ms-2'>
        <BsEyeFill />
      </div>
      <h6 className='ms-2 mt-1'> {numeroVistas} </h6>
    </>
  );
};

export default memo(VistasProducto);
