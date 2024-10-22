import React from 'react';
import { useSelector } from 'react-redux';
import { BsEyeFill, BsEyeSlash, BsJournal } from 'react-icons/bs';

const VistasProducto = () => {
  const numeroVistas = useSelector((state) => state.products.productViews);
  console.log(numeroVistas);
  return (
    <>
      <div className='ms-2'>
        <BsEyeFill />
      </div>
      <h6 className='ms-2 mt-1'> {numeroVistas} </h6>
    </>
  );
};

export default VistasProducto;
