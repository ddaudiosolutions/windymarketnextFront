'use client';

import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { calculoPesoVolumetrico, calculoPrecioEnvio } from './formulasEnvio';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
      <p className='text-red-500 text-sm font-semibold mt-1'>
        IMPORTANTE!! No olvides rellenar todos los datos de envio en tu perfil
      </p>
      <p className='text-red-500 text-sm font-semibold mt-1'>
        IMPORTANTE!! Si tu paquete tiene una medida máxima en uno de sus lados de 120cm NO OLVIDES
        AÑADIR EL PESO EN KGS
      </p>
      <Field name='balearicDelivery' type='checkbox'>
        {({ input }) => (
          <div className='mb-4 mt-4'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='balearic-switch'>Origen o destino Baleares</Label>
              <Switch checked={input.value} onCheckedChange={input.onChange} id='balearic-switch' />
            </div>
          </div>
        )}
      </Field>
      <h5 className='font-saira text-lg mb-3'>Medidas producto (en metros)</h5>
      <div className='flex justify-between gap-3'>
        <div className='flex-1'>
          <Label className='mb-2'>Alto</Label>
          <Field name='alto'>
            {({ input }) => <Input {...input} type='number' placeholder='Alto' className='mt-1' />}
          </Field>
        </div>
        <div className='flex-1'>
          <Label className='mb-2'>Ancho</Label>
          <Field name='ancho'>
            {({ input }) => <Input {...input} type='number' placeholder='Ancho' className='mt-1' />}
          </Field>
        </div>
        <div className='flex-1'>
          <Label className='mb-2'>Largo</Label>
          <Field name='largo'>
            {({ input }) => <Input {...input} type='number' placeholder='Largo' className='mt-1' />}
          </Field>
        </div>

        {/* Campo Peso (actualizado automáticamente) */}
        {pesoVolumetrico >= 0 && (
          <div className='flex-1'>
            <Label className='mb-2'>Peso Volumétrico</Label>
            <Field name='pesoVolumetrico'>
              {({ input }) => (
                <Input {...input} type='number' placeholder='Peso volumétrico' className='mt-1' />
              )}
            </Field>
          </div>
        )}
        {/* Campo Peso en Kgs si medidas no superan 120cm */}
        {pesoVolumetrico <= -1 && (
          <div className='flex-1'>
            <Label className='mb-2'>Peso en Kilos</Label>
            <Field name='pesoKgs'>
              {({ input }) => (
                <Input {...input} type='number' placeholder='Peso Kgs' className='mt-1' />
              )}
            </Field>
          </div>
        )}

        {/* Campo Precio (actualizado automáticamente) */}
        <div className='flex-1'>
          <Label className='mb-2'>Precio Estimado en €</Label>
          <Field name='precioEstimado'>
            {({ input }) => (
              <Input {...input} type='number' placeholder='Precio estimado' className='mt-1' />
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default FormPaqueteEnvio;
