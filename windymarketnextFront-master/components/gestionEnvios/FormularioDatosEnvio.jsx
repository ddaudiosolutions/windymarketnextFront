import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailPegatinas } from '../../reduxLib/slices/productSlices';
import Swal from 'sweetalert2';

function FormularioDatosEnvio({ handleClose, datosRemitente }) {
  const datosDestinatario = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    if (values.codigoPostalDesti === '00000' || values.dniDesti === '00000000z') {
      Swal.fire({
        title: 'Por favor, rellena todos los campos correctamente.',
        icon: 'error',
      });
      return;
    }
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
          apellidosRemi: datosRemitente.author.apellidos,
          telefonoRemi: datosRemitente.author.telefono,
          emailRemi: datosRemitente.author.email,
          direccionRemi:
            datosRemitente.author.direccion === 'undefined' ? '' : datosRemitente.author.direccion,
          poblacionRemi: datosRemitente.author.poblacion_CP,
          codigoPostalRemi: datosRemitente.author.codigoPostal,
          dniRemi: datosRemitente.author.dni,
          nombreDesti: datosDestinatario.nombre,
          apellidosDesti: datosDestinatario.apellidos,
          telefonoDesti: datosDestinatario.telefono,
          emailDesti: datosDestinatario.email,
          direccionDesti:
            datosDestinatario.direccion === 'undefined' ? '' : datosDestinatario.direccion,
          poblacionDesti: datosDestinatario.poblacion_CP,
          codigoPostalDesti: datosDestinatario.codigoPostal,
          dniDesti: datosDestinatario.dni,
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
                  <h5 className='form-label'>Datos del Vendedor</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nombre:</label>
                  <Field
                    name='nombreRemi'
                    component='input'
                    placeholder='Nombre'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Apellidos:</label>
                  <Field
                    name='apellidosRemi'
                    component='input'
                    placeholder='Apellidos'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>DNI:</label>
                  <Field
                    name='dniRemi'
                    component='input'
                    placeholder='dni'
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
                  <label className='form-label'>Poblacion:</label>
                  <Field
                    name='poblacionRemi'
                    component='input'
                    placeholder='Poblacion'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>CP:</label>
                  <Field
                    name='codigoPostalRemi'
                    component='input'
                    placeholder='CP'
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
                  <h5 className='form-label'>Datos del Comprador</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nombre:</label>
                  <Field
                    name='nombreDesti'
                    component='input'
                    placeholder='Nombre'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Apellidos:</label>
                  <Field
                    name='apellidosDesti'
                    component='input'
                    placeholder='Apellidos'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>DNI:</label>
                  <Field
                    name='dniDesti'
                    component='input'
                    placeholder='dni'
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
                  <label className='form-label'>Poblacion:</label>
                  <Field
                    name='poblacionDesti'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>CP:</label>
                  <Field
                    name='codigoPostalDesti'
                    component='input'
                    placeholder='CP'
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                      disabled={true}
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
                    disabled={true}
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
