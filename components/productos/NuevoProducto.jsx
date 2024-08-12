'use client';
//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import { useState } from 'react';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProducto } from '../../reduxLib/slices/productSlices';
import { Form, Field } from 'react-final-form';
import Swal from 'sweetalert2';
import {
  swalFireFaltaTelefono,
  swalFirePesoImagenes,
  swalPesoKgsAlert,
  verificarPesoImagenes,
} from '../../helpers/utils';
import FormPaqueteEnvio from '../gestionEnvios/FormPaqueteEnvio';

const NuevoProducto = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.users.user);
  const [images, setImage] = useState('');

  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));

  const verificarPesoVolumetricoYEnviar = (values) => {
    if (values.delivery && values.pesoVolumetrico <= -1 && values.pesoKgs <= 0) {
      swalPesoKgsAlert();
    } else {
      mostrarAlertaYEnviarDatos(agregarProducto, images, values);
    }
  };
  const submitNuevoProducto = (values) => {
    if (images.length > 0) {
      if (verificarPesoImagenes(images)) {
        swalFirePesoImagenes().then((result) => {
          if (result.isConfirmed) {
            if (usuario.telefono === undefined) {
              swalFireFaltaTelefono().then((result) => {
                if (result.isConfirmed) {
                  verificarPesoVolumetricoYEnviar(values);
                }
              });
            } else {
              verificarPesoVolumetricoYEnviar(values);
            }
          }
        });
      } else {
        if (usuario.telefono === undefined) {
          swalFireFaltaTelefono().then((result) => {
            if (result.isConfirmed) {
              verificarPesoVolumetricoYEnviar(values);
            }
          });
        } else {
          verificarPesoVolumetricoYEnviar(values);
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Debes subir al menos una imagen',
      });
    }
  };
  const required = (value) => value === (undefined || '') && 'Debes Rellenar este campo';

  return (
    <div className='container-fluid  rounded my-4 p-2'>
      <div className='d-flex justify-content-center'>
        <div className='rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent'>
          <h2 className='text-center mx-auto font-wight-bold mb-5'>Agregar Nuevo Producto</h2>
          <Form
            onSubmit={submitNuevoProducto}
            initialValues={{
              categoria: '',
              subCategoria: '',
              title: '',
              price: '',
              description: '',
              contacto: usuario ? usuario.email : '',
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
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
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
                    <div>
                      <label className=''>Sube Tus Fotos:</label>
                      <h5 className='text-danger'>
                        Las Imagenes no pueden pesar más de 1MB cada Una{' '}
                      </h5>
                    </div>
                    <input
                      className='form-input btn-file-upload'
                      id='images'
                      type='file'
                      multiple
                      onChange={(e) => setImage(e.target.files)}
                    ></input>
                  </div>
                </div>
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                <div className='mb-3 mt-3 text-center'>
                  <button
                    className='btn btn-outline-warning'
                    type='submit'
                    disabled={images.length > 8}
                  >
                    Agregar Producto
                  </button>
                </div>
              </form>
            )}
          />
          {images.length > 8 ? (
            <h6 className='alert alert-warning col-6 text-center mx-auto mt-2'>
              Solo puedes subir un maximo de 8 fotos
            </h6>
          ) : null}
        </div>
      </div>
    </div>
  );
};

function mostrarAlertaYEnviarDatos(agregarProducto, images, values) {
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
  formData.set('delivery', values.delivery || false);
  formData.set('balearicDelivery', values.balearicDelivery || false);
  formData.set('alto', values.alto || 0);
  formData.set('ancho', values.ancho || 0);
  formData.set('largo', values.largo || 0);
  formData.set('precioEstimado', values.precioEstimado || 0);
  formData.set('pesoVolumetrico', values.pesoVolumetrico || 0);
  formData.set('pesoKgs', values.pesoKgs || 0);
  formData.set('vendido', false);
  formData.set('reservado', false);

  agregarProducto(formData);
}

export default NuevoProducto;
