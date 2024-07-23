'use client';
import Image from 'next/image';

const loadImage = ({ src, width }) => {
  return `${src}?w=${width}h=${'auto'}`;
};

const Imagen = ({ valor }) => {
  return (
    <>
      <Image
        loader={loadImage}
        src={valor}
        alt={valor.toString()}
        width={valor.width || 204}
        height={valor.height || 190}
        quality={100}
        className='card-img'
        style={{ objectFit: 'cover' }}
      />
    </>
  );
};

export default Imagen;
