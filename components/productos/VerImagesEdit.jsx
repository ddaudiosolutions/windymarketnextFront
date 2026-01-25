'use client';

import { Fragment, useState } from 'react';

const VerImagesEdit = ({ imagenEdit, sendDataToParent, numImages }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Fragment>
      <div className='container col-2  mb-3'>
        <>
          <input
            type='checkbox'
            className='btn '
            id={imagenEdit._id}
            checked={checked}
            onChange={() => setChecked(!checked)}
            value='true'
            onClick={(e) => sendDataToParent(imagenEdit.filename, { checked })}
          />
        </>

        <label className='btn btn-outline-secondary' htmlFor={imagenEdit._id}>
          <img
            src={imagenEdit.url}
            style={{ height: '10rem', width: '10rem' }}
            key={imagenEdit._id}
            className='card-img-top '
            alt='...'
          ></img>
        </label>
      </div>
    </Fragment>
  );
};

export default VerImagesEdit;
