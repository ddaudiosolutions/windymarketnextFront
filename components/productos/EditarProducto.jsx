'use client';

import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormData from 'form-data';
import { editarProducto, obtenerProductoIdApi, setProductToEdit } from '@/reduxLib/slices/productSlices';
import VerImagesEdit from '@/components/productos/VerImagesEdit';
import Swal from 'sweetalert2';
import {
  swalFireFaltaTelefono,
  swalFirePesoImagenes,
  swalPesoKgsAlert,
  verificarPesoImagenes,
} from '@/helpers/utils';
import { Field, Form } from 'react-final-form';
import FormPaqueteEnvio from '@/components/gestionEnvios/FormPaqueteEnvio';
import useProductImages from '@/hooks/useProductImages';
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

// FUNCION PARA EDITAR PRODUCTO

const EditarProducto = ({ productId }) => {
  const dispatch = useDispatch();
  const productoEditar = useSelector((state) => state.products.productToEdit);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar producto fresco cada vez que se monta el componente
  useEffect(() => {
    if (productId) {
      setLoading(true);
      dispatch(obtenerProductoIdApi(productId)).then((res) => {
        if (res.payload?.data) {
          dispatch(setProductToEdit(res.payload.data));
        }
        setLoading(false);
      });
    }

    // Limpiar al desmontar el componente
    return () => {
      dispatch(setProductToEdit(null));
    };
  }, [productId, dispatch]);

  useEffect(() => {
    if (productoEditar?._id) {
      setId(productoEditar._id);
    }
  }, [productoEditar?._id]);

  // Custom hook para manejar lógica de imágenes
  const {
    imagesToUpload,
    imagesToDelete,
    errors,
    isValid,
    handleFileChange,
    handleToggleDelete,
  } = useProductImages({
    existingImages: productoEditar?.images || [],
    maxImages: 8,
    mode: 'edit',
  });

  const sendDataToParent = (filename, status) => {
    handleToggleDelete(filename, !status.checked);
  };

  // Verificar si el producto está disponible DESPUÉS de todos los hooks
  if (!productoEditar || loading) {
    return <div className='flex justify-center items-center min-h-screen'>Cargando producto...</div>;
  }

  const sendDataEditProduct = (producto, id) => {
    dispatch(editarProducto(producto, id));
  };

  const verificarPesoVolumetricoYEnviar = (values) => {
    if (values.delivery && values.pesoVolumetrico <= -1 && values.pesoKgs <= 0) {
      swalPesoKgsAlert();
    } else {
      mostrarAlertaYEnviarDatos(sendDataEditProduct, imagesToUpload, imagesToDelete, id, values);
    }
  };

  const submitEditarProducto = (values) => {
    // Validar con el hook
    if (!isValid) {
      if (errors.noImages) {
        Swal.fire({
          icon: 'error',
          text: errors.noImages,
        });
      }
      return;
    }

    if (verificarPesoImagenes(imagesToUpload)) {
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
    <div className='mx-auto max-w-4xl py-10'>
      <div className='rounded-xl border bg-white p-6 shadow-sm'>
        <h2 className='mb-8 text-center text-2xl font-semibold'>Editar producto</h2>

        <Form
          onSubmit={submitEditarProducto}
          initialValues={{
            categoria: productoEditar.categoria || '',
            subCategoria: productoEditar.subCategoria || '',
            title: productoEditar.title || '',
            price: productoEditar.price || 0,
            description: productoEditar.description || '',
            contacto: productoEditar.author?.nombre || '',
            delivery: productoEditar.delivery || false,
            alto: productoEditar.alto || 0,
            ancho: productoEditar.ancho || 0,
            largo: productoEditar.largo || 0,
            pesoVolumetrico: parseFloat(productoEditar.pesoVolumetrico) || 0,
            pesoKgs: productoEditar.pesoKgs || 0,
            precioEstimado: parseFloat(productoEditar.precioEstimado) || 0,
            balearicDelivery: productoEditar.balearicDelivery || false,
            reservado: productoEditar.reservado || false,
            vendido: productoEditar.vendido || false,
          }}
          render={({ handleSubmit, values, form }) => (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* CATEGORIA */}
              <Field name='categoria' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-1'>
                    <Label>Selecciona el tipo de producto</Label>
                    <Select onValueChange={input.onChange} value={input.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona...' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='tablas'>Tabla</SelectItem>
                        <SelectItem value='velas'>Vela</SelectItem>
                        <SelectItem value='botavaras'>Botavara</SelectItem>
                        <SelectItem value='mastiles'>Mástil</SelectItem>
                        <SelectItem value='accesorios'>Accesorio</SelectItem>
                      </SelectContent>
                    </Select>
                    {meta.touched && meta.error && (
                      <p className='text-sm text-red-500'>Este campo es requerido</p>
                    )}
                  </div>
                )}
              </Field>

              {/* SUBCATEGORIA */}
              <Field name='subCategoria' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-1'>
                    <Label>Selecciona la subcategoría</Label>
                    <Select onValueChange={input.onChange} value={input.value}>
                      <SelectTrigger>
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
                        <SelectItem value='aleta'>Aleta</SelectItem>
                        <SelectItem value='arnes'>Arnés</SelectItem>
                        <SelectItem value='alargador'>Alargador</SelectItem>
                      </SelectContent>
                    </Select>
                    {meta.touched && meta.error && (
                      <p className='text-sm text-red-500'>Este campo es requerido</p>
                    )}
                  </div>
                )}
              </Field>

              {/* TITULO */}
              <Field name='title' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-1'>
                    <Label>Título</Label>
                    <Input {...input} type='text' />
                    {meta.touched && meta.error && (
                      <p className='text-sm text-red-500'>Este campo es requerido</p>
                    )}
                  </div>
                )}
              </Field>

              {/* PRECIO */}
              <Field name='price' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-1'>
                    <Label>Precio</Label>
                    <Input {...input} type='number' />
                    {meta.touched && meta.error && (
                      <p className='text-sm text-red-500'>Este campo es requerido</p>
                    )}
                  </div>
                )}
              </Field>

              {/* DESCRIPCION */}
              <Field name='description' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-1'>
                    <Label>Descripción del producto</Label>
                    <Textarea {...input} rows={4} />
                    {meta.touched && meta.error && (
                      <p className='text-sm text-red-500'>Introduce una descripción</p>
                    )}
                  </div>
                )}
              </Field>

              {/* CONTACTO */}
              <Field name='contacto' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-1'>
                    <Label>Contacto</Label>
                    <Input {...input} />
                    {meta.touched && meta.error && (
                      <p className='text-sm text-red-500'>Este campo es requerido</p>
                    )}
                  </div>
                )}
              </Field>

              {/* DELIVERY */}
              <Field name='delivery' type='checkbox'>
                {({ input }) => (
                  <div className='flex items-center gap-3 pt-4'>
                    <Switch
                      checked={input.value}
                      onCheckedChange={input.onChange}
                      id='delivery-switch'
                    />
                    <Label htmlFor='delivery-switch'>¿Envío disponible?</Label>
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

              {/* IMAGENES EXISTENTES */}
              <div className='space-y-3 pt-6'>
                <Label>Selecciona las imágenes que quieres sustituir</Label>

                <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                  {productoEditar.images?.map((imagenEdit) => (
                    <VerImagesEdit
                      key={imagenEdit._id}
                      imagenEdit={imagenEdit}
                      sendDataToParent={sendDataToParent}
                      numImages={productoEditar.images.length}
                    />
                  ))}
                </div>

                <div>
                  <Label className='mb-2'>Sube nuevas fotos:</Label>
                  <p className='text-red-500 text-sm mb-2'>
                    Las Imagenes no pueden pesar más de 1MB cada Una
                  </p>
                  <div className='flex items-center gap-3'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => document.getElementById('images-edit').click()}
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
                    id='images-edit'
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <div className='pt-6 text-center'>
                <Button type='submit' variant='outline' disabled={!isValid}>
                  Editar producto
                </Button>
              </div>
            </form>
          )}
        />

        {errors.maxImages && (
          <Fragment>
            <p className='mt-4 text-center text-sm text-red-500'>{errors.maxImages}</p>
            <p className='text-center text-sm text-red-500'>
              Selecciona las imágenes que quieres sustituir.
            </p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

function mostrarAlertaYEnviarDatos(sendDataEditProduct, imagesToUpload, imagesToDelete, id, values) {
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

  for (let i = 0; i < imagesToDelete.length; i++) {
    formData.append('imagesDelete', imagesToDelete[i]);
  }
  sendDataEditProduct({ formData, id, history });
}

export default EditarProducto;
