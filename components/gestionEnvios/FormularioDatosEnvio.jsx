import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailPegatinas } from '../../reduxLib/slices/productSlices';
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
            <div className='d-flex justify-content-between'>
              <div className='me-4'>
                <div className='mb-3'>
                  <h5 className='form-label'>Remitente</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nombre y Apellidos:</label>
                  <Field
                    name='nombreRemi'
                    component='input'
                    placeholder='Nombre'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Direccion:</label>
                  <Field
                    name='direccionRemi'
                    component='input'
                    placeholder='Direccion Completa'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Poblacion y CP:</label>
                  <Field
                    name='poblacion_CPRemi'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Telefono Móvil:</label>
                  <Field
                    name='telefonoRemi'
                    component='input'
                    placeholder='Teléfono'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email:</label>
                  <Field
                    name='emailRemi'
                    component='input'
                    placeholder='Email'
                    className='form-control'
                    required
                  />
                </div>
              </div>
              <div>
                <div className='mb-3'>
                  <h5 className='form-label'>Destinatario</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nombre y Apellidos:</label>
                  <Field
                    name='nombreDesti'
                    component='input'
                    placeholder='Nombre'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Direccion:</label>
                  <Field
                    name='direccionDesti'
                    component='input'
                    placeholder='Direccion Completa'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Poblacion y CP:</label>
                  <Field
                    name='poblacion_CPDesti'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Telefono Móvil:</label>
                  <Field
                    name='telefonoDesti'
                    component='input'
                    placeholder='Teléfono'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email:</label>
                  <Field
                    name='emailDesti'
                    component='input'
                    placeholder='Email'
                    className='form-control'
                    required
                  />
                </div>
              </div>
              <div>
                <div className='mb-3'>
                  <h5 className='form-label'>Paquete</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Alto</label>
                  <Field
                    className='form-control'
                    name='alto'
                    component='input'
                    type='number'
                    placeholder='Alto'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Ancho</label>
                  <Field
                    className='form-control'
                    name='ancho'
                    component='input'
                    type='number'
                    placeholder='Ancho'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Largo</label>
                  <Field
                    className='form-control'
                    name='largo'
                    component='input'
                    type='number'
                    placeholder='Largo'
                  />
                </div>

                {/* Campo Peso (actualizado automáticamente) */}
                {datosRemitente.pesoVolumetrico >= 0 && (
                  <div className='mb-3'>
                    <label className='form-label'>Peso Volumétrico</label>
                    <Field
                      className='form-control'
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
                    <label className='form-label'>Peso en Kilos</label>
                    <Field
                      className='form-control'
                      name='pesoKgs'
                      component='input'
                      type='number'
                      placeholder='Peso Kgs'
                    />
                  </div>
                )}

                {/* Campo Precio (actualizado automáticamente) */}
                <div>
                  <label className='mb-2'>Precio Estimado en EUR</label>
                  <Field
                    className='form-control'
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
              className='btn btn-outline-success'
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
