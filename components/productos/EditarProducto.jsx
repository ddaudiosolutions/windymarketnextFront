'use client';

import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormData from 'form-data';
import { editarProducto } from '../../reduxLib/slices/productSlices';
import VerImagesEdit from './VerImagesEdit';
import Swal from 'sweetalert2';
import {
  swalFireFaltaTelefono,
  swalFirePesoImagenes,
  swalPesoKgsAlert,
  verificarPesoImagenes,
} from '../../helpers/utils';
import { Field, Form } from 'react-final-form';
import FormPaqueteEnvio from '../gestionEnvios/FormPaqueteEnvio';

// FUNCION PARA EDITAR PRODUCTO

const EditarProducto = () => {
  const dispatch = useDispatch();

  // OPCIONES DESDE NUEVO PRODUCTO;
  const [images, setImage] = useState(''); // IMAGENES DEL STATE INICIAL
  const [id, setId] = useState('');

  const productoEditar = useSelector((state) => state.products.productToEdit);
  const [imagesTotales, setImagesTotales] = useState(''); // NUM TOTA DE IMGS (SUBIDAS Y POR SUBIR)
  const [imagesT, setImages] = useState(''); // NUEVAS IMAGENES PARA SUBIR
  const imagesState = parseInt(productoEditar.images.length); // NUM IMAGENES YA SUBIDAS
  const imagesSelect = parseInt(imagesT.length); // NUMERO DE IMAGENES A SUBIR

  // STATE DE IMAGENES A BORRAR
  const [imageSel, setImageSel] = useState(''); // creamos el state que llenamos desde el hijo

  // DIFERENCIA ENTRE ALMACENADAS Y CARGADAS PARA SUBIR
  const [imageDif, setImageDif] = useState();

  // STATE PESO IMAGENES
  const [imagesSize, setImagesSize] = useState(0);
  /*  const [verifySize, setVerifySize] = useState(false); */

  const sendDataToParent = (filename, status) => {
    if (status.checked === false) {
      addImagesSel(filename);
    } else {
      deleteImage(filename);
    }
  };

  const addImagesSel = (filename) => {
    setImageSel([...imageSel, filename]);
  };
  const deleteImage = (filename) => {
    setImageSel(imageSel.filter((image) => image !== filename));
  };

  const total = 0;

  useEffect(() => {
    setImageDif(imagesTotales - imageSel.length);
    setImagesSize(total);
    setImages(imagesT); // NUEVAS IMAGENES PARA SUBIR
    setImage(productoEditar.images); // IMAGENES DE ESTADO INICAL
    setImagesTotales(imagesState + imagesSelect);
    setId(productoEditar._id);
    if (imageSel.length === productoEditar.images.length && imagesT.length === 0) {
      Swal.fire({
        icon: 'error',
        text: 'No puedes borrar todas las imagenes, deja al menos una, o cargar una imagen nueva',
      });
    }
  }, [imageSel, imagesT, imagesSize, imageDif, imagesSelect]);

  const sendDataEditProduct = (producto, id) => {
    dispatch(editarProducto(producto, id));
  };

  const verificarPesoVolumetricoYEnviar = (values) => {
    if (values.delivery && values.pesoVolumetrico >= 1) {
      swalPesoKgsAlert();
    } else {
      mostrarAlertaYEnviarDatos(sendDataEditProduct, imagesT, imageSel, id, values);
    }
  };

  const submitEditarProducto = (values) => {
    if (imageSel.length === productoEditar.images.length && imagesT.length === 0) {
      Swal.fire({
        icon: 'error',
        text: 'No puedes borrar todas las imagenes, deja al menos una, o cargar una imagen nueva',
      });
    } else if (verificarPesoImagenes(imagesT)) {
      swalFirePesoImagenes().then((result) => {
        if (result.isConfirmed) {
          if (productoEditar.author.telefono === undefined) {
            swalFireFaltaTelefono().then((result) => {
              if (result.isConfirmed) {
                verificarPesoVolumetricoYEnviar(values, result);
              }
            });
          }
          verificarPesoVolumetricoYEnviar(values, result);
        }
      });
    } else {
      if (productoEditar.author.telefono === undefined) {
        swalFireFaltaTelefono().then((result) => {
          if (result.isConfirmed) {
            verificarPesoVolumetricoYEnviar(values, result);
          }
        });
      } else {
        verificarPesoVolumetricoYEnviar(values);
      }
    }
  };

  const required = (value) => value === (undefined || '') && 'Debes Rellenar este campo';
  return (
    <div className='container-fluid  rounded my-4 p-3'>
      <div className='d-flex justify-content-center'>
        <div className='rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent'>
          <h2 className='text-center mx-auto font-wight-bold mb-5'>Editar Producto</h2>

          <Form
            onSubmit={submitEditarProducto}
            initialValues={{
              categoria: productoEditar.categoria,
              subCategoria: productoEditar.subCategoria,
              title: productoEditar.title,
              price: productoEditar.price,
              description: productoEditar.description,
              contacto: productoEditar.author.nombre,
              delivery: productoEditar.delivery,
              alto: productoEditar.alto,
              ancho: productoEditar.ancho,
              largo: productoEditar.largo,
              pesoVolumetrico: parseFloat(productoEditar.pesoVolumetrico),
              pesoKgs: productoEditar.pesoKgs,
              precioEstimado: parseFloat(productoEditar.precioEstimado),
              balearicDelivery: productoEditar.balearicDelivery,
              reservado: productoEditar.reservado,
              vendido: productoEditar.vendido,
            }}
            render={({ handleSubmit, values, form }) => (
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <Field name='categoria' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label className='mb-2'>Selecciona el tipo de producto</label>
                        <select {...input} className='form-select mb-2'>
                          <option value=''></option>
                          <option value='tablas'>Tabla</option>
                          <option value='velas'>Vela</option>
                          <option value='botavaras'>Botavara</option>
                          <option value='mastiles'>Mastil</option>
                          <option value='accesorios'>Accesorio</option>
                        </select>
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='subCategoria' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label className='mb-2'>Selecciona la SubCategoria</label>
                        <select {...input} className='form-select mb-2'>
                          <option value=''></option>
                          <option value='slalom'>Slalom</option>
                          <option value='freeride'>Free-Ride</option>
                          <option value='freerace'>Free-Race</option>
                          <option value='freestyle'>Free-Style</option>
                          <option value='foil'>Foil</option>
                          <option value='waves'>Waves</option>
                          <option value='carbono'>Carbono</option>
                          <option value='aluminio'>Aluminio</option>
                          <option value='mixta'>Mixta</option>
                          <option value='rdm'>RDM</option>
                          <option value='sdm'>SDM</option>
                          <option value='aleta'>ALETA</option>
                          <option value='arnes'>ARNES</option>
                          <option value='alargador'>ALARGADOR</option>
                        </select>
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='title' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label className='mb-2'>Título</label>
                        <input {...input} type='text' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='price' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label className='mb-2'>Precio</label>
                        <input {...input} type='number' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='description' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label className='mb-2'>Descripción del Producto</label>
                        <textarea {...input} type='textarea' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Introduce una descripción</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='contacto' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label className='mb-2'>Contacto</label>
                        <input {...input} type='textarea' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='delivery' type='checkbox'>
                    {({ input, meta }) => (
                      <div className='mb-4 mt-4'>
                        <div className='d-flex align-items-center'>
                          <label className='me-2'>¿Envío disponible?</label>
                          <div className='btn-primary form-check form-switch mt-1'>
                            <input
                              {...input}
                              /* type='checkbox' */
                              className='form-check-input'
                              role='switch'
                              id={`${input.name}-switch`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Field>
                  {values.delivery && (
                    <FormPaqueteEnvio
                      alto={values.alto}
                      ancho={values.ancho}
                      largo={values.largo}
                      pesoVolumetrico={values.pesoVolumetrico}
                      pesoKgs={values.pesoKgs}
                      balearicDelivery={values.balearicDelivery}
                      form={form}
                    />
                  )}

                  <div>
                    <div className='container'>
                      <div className='row d-flex'>
                        <div>
                          <h6>Selecciona las imagenes que quieres sutituir : </h6>
                        </div>
                        {!images
                          ? null
                          : images.map((imagenEdit) => (
                              <VerImagesEdit
                                key={imagenEdit._id}
                                className=''
                                imagenEdit={imagenEdit}
                                sendDataToParent={sendDataToParent}
                                numImages={images.length}
                              />
                            ))}
                      </div>
                    </div>
                    <div className='text-center'></div>
                    <input
                      className='form-input'
                      id='images'
                      type='file'
                      multiple
                      onChange={(e) => setImages(e.target.files)}
                    ></input>
                  </div>
                  <div className='mb-3 mt-3 text-center'>
                    <button
                      className='btn btn-outline-warning'
                      type='submit'
                      disabled={imageDif > 8}
                    >
                      Editar Producto
                    </button>
                  </div>
                </div>

                {/*  <pre className='bg-success'>{JSON.stringify(values, 0, 2)}</pre> */}
              </form>
            )}
          />
          {imageDif > 8 ? (
            <Fragment>
              <h6 className='alert alert-success col-6 text-center mx-auto'>
                El numero máximo de imágenes es 8.
              </h6>
              <h5 className='alert alert-success col-6 text-center mx-auto'>
                Selecciona las imagenes que quieres sustituir
              </h5>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

function mostrarAlertaYEnviarDatos(sendDataEditProduct, images, imageSel, id, values) {
  const formData = new FormData();
  for (let j = 0; j < images.length; j++) {
    formData.append('images', images[j]);
  }
  formData.set('title', values.title);
  formData.set('categoria', values.categoria);
  formData.set('subCategoria', values.subCategoria);
  formData.set('price', values.price);
  formData.set('description', values.description);
  formData.set('contacto', values.contacto);
  formData.set('id', id);
  formData.set('delivery', values.delivery);
  formData.set('balearicDelivery', values.balearicDelivery);
  formData.set('alto', values.alto);
  formData.set('ancho', values.ancho);
  formData.set('largo', values.largo);
  formData.set('precioEstimado', values.precioEstimado);
  formData.set('pesoVolumetrico', values.pesoVolumetrico);
  formData.set('pesoKgs', values.pesoKgs);
  formData.set('vendido', values.vendido);
  formData.set('reservado', values.reservado);

  for (let i = 0; i < imageSel.length; i++) {
    formData.append('imagesDelete', imageSel[i]);
  }
  sendDataEditProduct({ formData, id, history });
}

export default EditarProducto;
