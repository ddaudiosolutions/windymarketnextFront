'use client';

import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailPegatinas } from '@/reduxLib/slices/productSlices';
import Swal from 'sweetalert2';

function FormularioDatosEnvio({ handleClose, datosRemitente }) {
  const datosDestinatario = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    Swal.fire({
      title: 'Quieres que empecemos la gestión de tu Envio?',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    }).then(function () {
      dispatch(sendMailPegatinas({ message: values }));
      handleClose(false);
    });
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          nombreRemi: datosRemitente.author.nombre,
          telefonoRemi: datosRemitente.author.telefono,
          emailRemi: datosRemitente.author.email,
          direccionRemi:
            datosRemitente.author.direccion === 'undefined' ? '' : datosRemitente.author.direccion,
          poblacion_CPRemi: datosRemitente.author.poblacion_CP,
          nombreDesti: datosDestinatario.nombre,
          telefonoDesti: datosDestinatario.telefono,
          emailDesti: datosDestinatario.email,
          direccionDesti:
            datosDestinatario.direccion === 'undefined' ? '' : datosDestinatario.direccion,
          poblacion_CPDesti: datosDestinatario.poblacion_CP,
          alto: datosRemitente.alto,
          ancho: datosRemitente.ancho,
          largo: datosRemitente.largo,
          pesoVolumetrico: datosRemitente.pesoVolumetrico,
          pesoKgs: datosRemitente.pesoKgs,
          precioEstimado: datosRemitente.precioEstimado,
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col lg:flex-row justify-between gap-4 lg:gap-6'>
              <div className='flex-1'>
                <div className='mb-2 md:mb-3'>
                  <h5 className='block text-sm md:text-base font-semibold mb-2'>Remitente</h5>
                </div>
                <div className='mb-2 md:mb-3'>
                  <label className='block text-xs md:text-sm font-medium mb-1'>Nombre y Apellidos:</label>
                  <Field
                    name='nombreRemi'
                    component='input'
                    placeholder='Nombre'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Direccion:</label>
                  <Field
                    name='direccionRemi'
                    component='input'
                    placeholder='Direccion Completa'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Poblacion y CP:</label>
                  <Field
                    name='poblacion_CPRemi'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Telefono Móvil:</label>
                  <Field
                    name='telefonoRemi'
                    component='input'
                    placeholder='Teléfono'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Email:</label>
                  <Field
                    name='emailRemi'
                    component='input'
                    placeholder='Email'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
              </div>
              <div className='flex-1'>
                <div className='mb-3'>
                  <h5 className='block text-sm font-semibold mb-2'>Destinatario</h5>
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Nombre y Apellidos:</label>
                  <Field
                    name='nombreDesti'
                    component='input'
                    placeholder='Nombre'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Direccion:</label>
                  <Field
                    name='direccionDesti'
                    component='input'
                    placeholder='Direccion Completa'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Poblacion y CP:</label>
                  <Field
                    name='poblacion_CPDesti'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Telefono Móvil:</label>
                  <Field
                    name='telefonoDesti'
                    component='input'
                    placeholder='Teléfono'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Email:</label>
                  <Field
                    name='emailDesti'
                    component='input'
                    placeholder='Email'
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                  />
                </div>
              </div>
              <div className='flex-1'>
                <div className='mb-3'>
                  <h5 className='block text-sm font-semibold mb-2'>Paquete</h5>
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Alto</label>
                  <Field
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    name='alto'
                    component='input'
                    type='number'
                    placeholder='Alto'
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Ancho</label>
                  <Field
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    name='ancho'
                    component='input'
                    type='number'
                    placeholder='Ancho'
                  />
                </div>
                <div className='mb-3'>
                  <label className='block text-sm font-medium mb-1'>Largo</label>
                  <Field
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    name='largo'
                    component='input'
                    type='number'
                    placeholder='Largo'
                  />
                </div>

                {/* Campo Peso (actualizado automáticamente) */}
                {datosRemitente.pesoVolumetrico >= 0 && (
                  <div className='mb-3'>
                    <label className='block text-sm font-medium mb-1'>Peso Volumétrico</label>
                    <Field
                      className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                      name='pesoVolumetrico'
                      component='input'
                      type='number'
                      placeholder='pesoVolumetrico'
                      // No es necesario establecer el valor aquí; se gestiona a través de form.change
                    />
                  </div>
                )}
                {/* Campo Peso en Kgs si medidas no superan 120cm */}
                {datosRemitente.pesoVolumetrico <= -1 && (
                  <div className='mb-3'>
                    <label className='block text-sm font-medium mb-1'>Peso en Kilos</label>
                    <Field
                      className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                      name='pesoKgs'
                      component='input'
                      type='number'
                      placeholder='Peso Kgs'
                    />
                  </div>
                )}

                {/* Campo Precio (actualizado automáticamente) */}
                <div>
                  <label className='block text-sm font-medium mb-2'>Precio Estimado (€)</label>
                  <Field
                    className='flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    name='precioEstimado'
                    component='input'
                    type='number'
                    placeholder='precioEstimado'
                    // No es necesario establecer el valor aquí; se gestiona a través de form.change
                  />
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='w-full md:w-auto px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition-colors mt-2'
              /* onClick={() => handleClose(false)} */ disabled={submitting}
            >
              Enviar
            </button>
          </form>
        )}
      />
    </>
  );
}

export default FormularioDatosEnvio;
