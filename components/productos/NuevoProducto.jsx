'use client';

//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO

import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProducto } from '@/reduxLib/slices/productSlices';
import { Form, Field } from 'react-final-form';
import Swal from 'sweetalert2';
import {
  swalFireFaltaTelefono,
  swalFirePesoImagenes,
  swalPesoKgsAlert,
  verificarPesoImagenes,
} from '@/helpers/utils';
import FormPaqueteEnvio from '@/components/gestionEnvios/FormPaqueteEnvio';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useProductImages from '@/hooks/useProductImages';

const NuevoProducto = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.users.user);

  // Custom hook para manejar lógica de imágenes
  const { imagesToUpload, errors, isValid, handleFileChange } = useProductImages({
    maxImages: 8,
    mode: 'create',
  });

  // Mostrar loading mientras carga el usuario
  if (!usuario) {
    return (
      <div className='main-container text-center mt-12'>
        <p>Cargando datos del usuario...</p>
      </div>
    );
  }

  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));

  const verificarPesoVolumetricoYEnviar = (values) => {
    if (values.delivery && values.pesoVolumetrico <= -1 && values.pesoKgs <= 0) {
      swalPesoKgsAlert();
    } else {
      mostrarAlertaYEnviarDatos(agregarProducto, imagesToUpload, values);
    }
  };

  const submitNuevoProducto = (values) => {
    // Validar con el hook
    if (!isValid) {
      if (errors.minImages) {
        Swal.fire({
          icon: 'error',
          text: errors.minImages,
        });
      }
      return;
    }

    if (verificarPesoImagenes(imagesToUpload)) {
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
  };
  const required = (value) => value === (undefined || '') && 'Debes Rellenar este campo';

  return (
    <div className='main-container rounded my-4 p-2'>
      <div className='flex justify-center'>
        <div className='rounded w-full shadow-lg p-3 bg-transparent'>
          <h2 className='text-center mx-auto font-bold mb-5 font-saira'>Agregar Nuevo Producto</h2>
          <Form
            onSubmit={submitNuevoProducto}
            initialValues={{
              categoria: '',
              subCategoria: '',
              title: '',
              price: '',
              description: '',
              contacto: usuario.email,
            }}
            render={({ handleSubmit, values, form }) => (
              <form onSubmit={handleSubmit}>
                <div className='space-y-4'>
                  <Field name='categoria' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className='mb-2'>Selecciona el tipo de producto</Label>
                        <Select onValueChange={input.onChange} value={input.value}>
                          <SelectTrigger className='mt-1'>
                            <SelectValue placeholder='Selecciona...' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='tablas'>Tabla</SelectItem>
                            <SelectItem value='velas'>Vela</SelectItem>
                            <SelectItem value='botavaras'>Botavara</SelectItem>
                            <SelectItem value='mastiles'>Mastil</SelectItem>
                            <SelectItem value='accesorios'>Accesorio</SelectItem>
                          </SelectContent>
                        </Select>
                        {meta.error && meta.touched && (
                          <span className='text-red-500 text-sm'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <div>
                    <Field name='subCategoria' validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Label className='mb-2'>Selecciona la SubCategoria</Label>
                          <Select onValueChange={input.onChange} value={input.value}>
                            <SelectTrigger className='mt-1'>
                              <SelectValue placeholder='Selecciona...' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='slalom'>Slalom</SelectItem>
                              <SelectItem value='freeride'>Free-Ride</SelectItem>
                              <SelectItem value='freerace'>Free-Race</SelectItem>
                              <SelectItem value='freestyle'>Free-Style</SelectItem>
                              <SelectItem value='foil'>Foil</SelectItem>
                              <SelectItem value='waves'>Waves</SelectItem>
                              <SelectItem value='carbono'>Carbono</SelectItem>
                              <SelectItem value='aluminio'>Aluminio</SelectItem>
                              <SelectItem value='mixta'>Mixta</SelectItem>
                              <SelectItem value='rdm'>RDM</SelectItem>
                              <SelectItem value='sdm'>SDM</SelectItem>
                              <SelectItem value='aleta'>ALETA</SelectItem>
                              <SelectItem value='arnes'>ARNES</SelectItem>
                              <SelectItem value='alargador'>ALARGADOR</SelectItem>
                            </SelectContent>
                          </Select>
                          {meta.error && meta.touched && (
                            <span className='text-red-500 text-sm'>Este campo es requerido</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <Field name='title' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className='mb-2'>Título</Label>
                        <Input {...input} type='text' className='mt-1' />
                        {meta.error && meta.touched && (
                          <span className='text-red-500 text-sm'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <div>
                    <Field name='price' validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Label className='mb-2'>Precio</Label>
                          <Input {...input} type='number' className='mt-1' />
                          {meta.error && meta.touched && (
                            <span className='error'>Este campo es requerido</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name='description' validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <Label className='mb-2'>Descripción del Producto</Label>
                          <Textarea {...input} type='textarea' className='mt-1' />
                          {meta.error && meta.touched && (
                            <span className='error'>Introduce una descripción</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <Field name='contacto' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className='mb-2'>Contacto</Label>
                        <Input {...input} type='textarea' className='mt-1' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='delivery' type='checkbox'>
                    {({ input, meta }) => (
                      <div className='mb-4 mt-4'>
                        <div className='flex items-center gap-2'>
                          <Label htmlFor='delivery-switch'>¿Envío disponible?</Label>
                          <Switch
                            checked={input.value}
                            onCheckedChange={input.onChange}
                            id='delivery-switch'
                          />
                        </div>
                        {meta.error && meta.touched && (
                          <span className='text-red-500 text-sm'>Este campo es requerido</span>
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
                    <Label className='mb-2'>Sube Tus Fotos:</Label>
                    <p className='text-red-500 text-sm mb-2'>
                      Las Imagenes no pueden pesar más de 1MB cada Una
                    </p>
                    <div className='flex items-center gap-3'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => document.getElementById('images').click()}
                        className='border-windy-cyan text-windy-cyan hover:bg-windy-cyan hover:text-white'
                      >
                        Seleccionar Archivos
                      </Button>
                      <span className='text-sm text-gray-600'>
                        {imagesToUpload.length > 0
                          ? `${imagesToUpload.length} archivo(s) seleccionado(s)`
                          : 'Ningún archivo seleccionado'}
                      </span>
                    </div>
                    <Input
                      className='hidden'
                      id='images'
                      type='file'
                      multiple
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className='mt-4 text-center'>
                  <Button
                    variant='outline'
                    type='submit'
                    disabled={!isValid}
                    className='border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                  >
                    Agregar Producto
                  </Button>
                </div>
              </form>
            )}
          />
          {errors.maxImages && (
            <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-center max-w-md mx-auto mt-2'>
              {errors.maxImages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function mostrarAlertaYEnviarDatos(agregarProducto, imagesToUpload, values) {
  const formData = new FormData();
  for (let j = 0; j < imagesToUpload.length; j++) {
    formData.append('images', imagesToUpload[j]);
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
