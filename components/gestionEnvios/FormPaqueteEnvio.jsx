import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { calculoPesoVolumetrico, calculoPrecioEnvio } from './formulasEnvio';

const FormPaqueteEnvio = (props) => {
  const { alto, ancho, largo, form } = props;
  useEffect(() => {
    const pesoVolumetrico = calculoPesoVolumetrico(alto || 0, ancho || 0, largo || 0).toFixed(3);
    form.change('pesoVolumetrico', parseFloat(pesoVolumetrico)); // Actualiza el valor de 'peso' en el formulario
  }, [alto, ancho, largo, form]);

  useEffect(() => {
    const precioEstimado = calculoPrecioEnvio(
      form.getState().values.pesoVolumetrico,
      form.getState().values.balearicDelivery,
      form.getState().values.pesoKgs
    );
    form.change('precioEstimado', parseFloat(precioEstimado.toFixed(2))); // Actualiza el valor de 'precioEstimado' en el formulario
    form.change(
      'pesoKgs',
      form.getState().values.pesoVolumetrico >= 0 ? 0 : form.getState().values.pesoKgs
    );
  }, [form]); // Dependiendo de cómo estés manejando `peso`, puede que necesites incluirlo en las dependencias
  const pesoVolumetrico = form.getState().values.pesoVolumetrico;

  return (
    <div className='mb-3'>
      <h6 className='mt-1' style={{ color: 'red' }}>
        IMPORTANTE!! No olvides rellenar todos los datos de envio en tu perfil
      </h6>
      <h6 className='mt-1' style={{ color: 'red' }}>
        IMPORTANTE!! Si tu paquete tiene una medida máxima en uno de sus lados de 120cm NO OLVIDES
        AÑADIR EL PESO EN KGS
      </h6>
      <Field name='balearicDelivery' type='checkbox'>
        {({ input, meta }) => (
          <div className='mb-4 mt-4'>
            <div className='d-flex align-items-center'>
              <label className='me-2'>Origen o destino Baleares</label>
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
      <h5>Medidas producto (en metros)</h5>
      <div className='d-flex justify-content-between'>
        <div>
          <label className='mb-2'>Alto</label>
          <Field
            className='form-control'
            name='alto'
            component='input'
            type='number'
            placeholder='Alto'
          />
        </div>
        <div>
          <label className='mb-2'>Ancho</label>
          <Field
            className='form-control'
            name='ancho'
            component='input'
            type='number'
            placeholder='Ancho'
          />
        </div>
        <div>
          <label className='mb-2'>Largo</label>
          <Field
            className='form-control'
            name='largo'
            component='input'
            type='number'
            placeholder='Largo'
          />
        </div>

        {/* Campo Peso (actualizado automáticamente) */}
        {pesoVolumetrico >= 0 && (
          <div>
            <label className='mb-2'>Peso Volumétrico</label>
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
        {pesoVolumetrico <= -1 && (
          <div>
            <label className='mb-2'>Peso en Kilos</label>
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
          <label className='mb-2'>Precio Estimado en €</label>
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
  );
};

export default FormPaqueteEnvio;
