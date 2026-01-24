'use client';
import { Fragment, useEffect } from 'react';
/* import { Link, useHistory } from "react-router-dom"; */
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerProducto = ({ producto }) => {
  console.log('producto', producto);
  const authorName = producto !== undefined ? producto.author.name : 'Anónimo';
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Inicializa Bootstrap JS en el cliente
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);
  return (
    <Fragment>
      <div className='container col-sm-9 col-md-9 col-lg-7 col-xl-7 '>
        <div className='cardVerProducto mt-3 '>
          <div className='d-flex justify-content-between'>
            <div
              className='d-flex justify-content-start  mt-3'
              type='button'
              onClick={() => {
                // TODO: Implementar navegación a productos del autor
                console.log('Ver productos del autor:', producto.author);
              }}
            >
              {producto.author.imagesAvatar[0].url === undefined ? (
                <Image
                  src='/Avatar_Default2.png'
                  className='card-img-topAvatar ms-4 mt-3 image-avatar'
                  alt='avatar for User windymarket windsurf segunda mano'
                  width={100}
                  height={100}
                ></Image>
              ) : (
                <Image
                  src={producto.author.imagesAvatar[0].url}
                  className='card-img-topAvatar ms-4 mt-3'
                  alt='avatarUser windymarket windsurf segunda mano'
                  width={70}
                  height={70}
                ></Image>
              )}
              <h5 className='h2Author ms-2 mt-4'>{authorName}</h5>
            </div>
            <div></div>
          </div>
          <div className='d-flex justify-content-center mt-4'>
            <div
              id='carouselExampleControlsNoTouching'
              className='carousel carousel-dark slide'
              data-bs-touch='false'
              data-bs-interval='false'
            >
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <a
                    className=' '
                    href={
                      producto.images && producto.images.length > 0 && producto.images[0].url
                        ? producto.images[0].url
                        : 'https://res.cloudinary.com/dhe1gcno9/img/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg'
                    }
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Image
                      src={
                        producto.images && producto.images.length > 0 && producto.images[0].url
                          ? producto.images[0].url
                          : 'https://res.cloudinary.com/dhe1gcno9/img/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg'
                      }
                      key={
                        producto.images && producto.images.length > 0 && producto.images[0]._id
                          ? producto.images[0]._id
                          : 'fakeImage'
                      }
                      width={800}
                      height={250}
                      /*  className={estilos.cardImageProductId} */
                      alt='...'
                      quality={100}
                    ></Image>
                  </a>
                </div>
                {producto.images.slice(1).map((img) => (
                  <div className='carousel-item' key={img._id}>
                    <a className=' ' href={img.url} target='_blank' rel='noreferrer'>
                      <Image
                        src={img.url}
                        quality={100}
                        key={img._id}
                        width={800}
                        height={250}
                        /*  className={estilos.cardImageProductId} */
                        alt='... windymarket windsurf segunda mano'
                      ></Image>
                    </a>
                  </div>
                ))}
              </div>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#carouselExampleControlsNoTouching'
                data-bs-slide='prev'
              >
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#carouselExampleControlsNoTouching'
                data-bs-slide='next'
              >
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </div>
          </div>
          <div className='d-flex justify-content-center mt-4'></div>
          <div className='card-body'>
            <h4 className=' price-hp1'>Precio: {producto.price} €</h4>
            <h5 className='card-title titleH5VerProducto rounded mt-1'>{producto.title}</h5>

            <div className='card-header mb-2'>
              <p className='card-title pproductoTitle'>{producto.description}</p>
            </div>
            <div className='card-header'>
              <div className='card-title pproductoTitle'></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerProducto;
