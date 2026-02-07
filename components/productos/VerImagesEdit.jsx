'use client';

import { Fragment, useState } from 'react';

const VerImagesEdit = ({ imagenEdit, sendDataToParent, numImages }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Fragment>
      <div className='w-full mb-2 md:mb-3'>
        <>
          <input
            type='checkbox'
            className='absolute z-10 opacity-0 cursor-pointer'
            id={imagenEdit._id}
            checked={checked}
            onChange={() => setChecked(!checked)}
            value='true'
            onClick={(e) => sendDataToParent(imagenEdit.filename, { checked })}
          />
        </>

        <label
          className='inline-block p-1.5 md:p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors'
          htmlFor={imagenEdit._id}
        >
          <img
            src={imagenEdit.url}
            key={imagenEdit._id}
            className='w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-md'
            alt='...'
          ></img>
        </label>
      </div>
    </Fragment>
  );
};

export default VerImagesEdit;
