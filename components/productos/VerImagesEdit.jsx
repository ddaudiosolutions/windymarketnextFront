'use client';

import { Fragment, useState } from 'react';

const VerImagesEdit = ({ imagenEdit, sendDataToParent, numImages }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Fragment>
      <div className='w-full mb-2 md:mb-3 relative'>
        <>
          <input
            type='checkbox'
            className='absolute z-10 opacity-0 cursor-pointer w-full h-full'
            id={imagenEdit._id}
            checked={checked}
            onChange={() => setChecked(!checked)}
            value='true'
            onClick={(e) => sendDataToParent(imagenEdit.filename, { checked })}
          />
        </>

        <label
          className={`inline-block p-1.5 md:p-2 border-2 rounded-md cursor-pointer transition-all ${
            checked
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          htmlFor={imagenEdit._id}
        >
          <div className='relative'>
            <img
              src={imagenEdit.url}
              key={imagenEdit._id}
              className='w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-md'
              alt='...'
            ></img>
            {checked && (
              <div className='absolute inset-0 bg-blue-600 bg-opacity-30 rounded-md flex items-center justify-center'>
                <svg
                  className='w-12 h-12 text-white'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M5 13l4 4L19 7'></path>
                </svg>
              </div>
            )}
          </div>
        </label>
      </div>
    </Fragment>
  );
};

export default VerImagesEdit;
