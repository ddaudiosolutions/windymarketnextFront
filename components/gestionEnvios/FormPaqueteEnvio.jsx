'use client';

import { useEffect } from 'react';
import { Field } from 'react-final-form';
import {
  calculoPesoVolumetrico,
  calculoPrecioEnvio,
  calculoGirth,
  tieneSobrecoste,
} from './formulasEnvio';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const FormPaqueteEnvio = ({
  alto,
  ancho,
  largo,
  pesoVolumetrico: pvProp,
  balearicDelivery,
  pesoKgs,
  opcionVelocidad,
  form,
}) => {

  // Recalcular pesoVolumetrico cuando cambian las medidas
  useEffect(() => {
    const pv = calculoPesoVolumetrico(alto || 0, ancho || 0, largo || 0);
    form.change('pesoVolumetrico', pv);
    if (pv >= 0) form.change('pesoKgs', 0);

    // Gestión de opcionVelocidad según si hay sobrecoste
    const hayLargo = parseFloat(String(largo || 0).replace(',', '.')) > 2.20;
    if (hayLargo && pv > 0) {
      // Auto-seleccionar rápida la primera vez que aparece el sobrecoste
      if (!form.getState().values.opcionVelocidad) {
        form.change('opcionVelocidad', 'rapida');
      }
    } else {
      // Limpiar la selección si ya no hay sobrecoste
      form.change('opcionVelocidad', undefined);
    }
  }, [alto, ancho, largo, form]);

  // Recalcular precioEstimado cuando cambia cualquier variable relevante
  useEffect(() => {
    const pv = pvProp ?? 0;
    if (pv === 0) return;
    const esLenta = opcionVelocidad === 'lenta';
    const precio = calculoPrecioEnvio(
      pv,
      balearicDelivery,
      pv <= -1 ? (pesoKgs || 0) : 0,
      largo || 0,
      esLenta
    );
    form.change('precioEstimado', parseFloat(precio.toFixed(2)));
  }, [pvProp, balearicDelivery, pesoKgs, largo, opcionVelocidad, form]);

  const pv = pvProp ?? 0;
  const sobrecoste = tieneSobrecoste(largo) && pv > 0;
  const girth = calculoGirth(largo || 0, ancho || 0, alto || 0);

  // Precios de ambas opciones para mostrar en el selector
  const precioRapida = sobrecoste
    ? calculoPrecioEnvio(pv, balearicDelivery, 0, largo || 0, false)
    : null;
  const precioLenta = sobrecoste
    ? calculoPrecioEnvio(pv, balearicDelivery, 0, largo || 0, true)
    : null;

  const esLenta = opcionVelocidad === 'lenta';

  return (
    <div className='mb-3'>
      <Field name='balearicDelivery' type='checkbox'>
        {({ input }) => (
          <div className='mb-4 mt-2'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='balearic-switch'>Origen o destino Baleares</Label>
              <Switch checked={input.value} onCheckedChange={input.onChange} id='balearic-switch' />
            </div>
          </div>
        )}
      </Field>

      <h5 className='font-saira text-lg mb-3'>Medidas del paquete (en metros)</h5>

      <div className='flex flex-wrap gap-3'>
        <div className='flex-1 min-w-[80px]'>
          <Label className='mb-2'>Alto</Label>
          <Field name='alto'>
            {({ input }) => <Input {...input} type='number' placeholder='Alto' className='mt-1' />}
          </Field>
        </div>
        <div className='flex-1 min-w-[80px]'>
          <Label className='mb-2'>Ancho</Label>
          <Field name='ancho'>
            {({ input }) => <Input {...input} type='number' placeholder='Ancho' className='mt-1' />}
          </Field>
        </div>
        <div className='flex-1 min-w-[80px]'>
          <Label className='mb-2'>Largo</Label>
          <Field name='largo'>
            {({ input }) => <Input {...input} type='number' placeholder='Largo' className='mt-1' />}
          </Field>
        </div>

        {/* Volumen calculado (tarifa volumétrica) */}
        {pv > 0 && (
          <div className='flex-1 min-w-[80px]'>
            <Label className='mb-2'>Volumen (m³)</Label>
            <Field name='pesoVolumetrico'>
              {({ input }) => (
                <Input {...input} type='number' readOnly className='mt-1 bg-gray-50 cursor-default' />
              )}
            </Field>
          </div>
        )}

        {/* Peso en kg: accesorios pequeños (max dim ≤ 1.20m) */}
        {pv === -1 && (
          <div className='flex-1 min-w-[80px]'>
            <Label className='mb-2'>Peso (kg)</Label>
            <Field name='pesoKgs'>
              {({ input }) => (
                <Input {...input} type='number' placeholder='Peso kg' className='mt-1' />
              )}
            </Field>
          </div>
        )}

        {/* Precio estimado: solo cuando NO hay selector de velocidad */}
        {pv !== 0 && !sobrecoste && (
          <div className='flex-1 min-w-[100px]'>
            <Label className='mb-2'>Precio est. (€)</Label>
            <Field name='precioEstimado'>
              {({ input }) => (
                <Input {...input} type='number' readOnly className='mt-1 bg-gray-50 cursor-default font-semibold' />
              )}
            </Field>
          </div>
        )}
      </div>

      {/* Info: bulto delgado tipo mástil/vela (girth ≤ 2.90m) */}
      {pv === -2 && girth > 0 && (
        <div className='mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800'>
          <strong>Servicio económico disponible</strong> — Largo + 2×Ancho + 2×Alto = {girth.toFixed(2)}m (≤ 2.90m)
          <br />
          Este bulto puede enviarse por el servicio para mástiles y velas. Precio orientativo: ~24€+IVA.
        </div>
      )}

      {/* Selector de velocidad: solo cuando largo > 2.20m y hay precio volumétrico */}
      {sobrecoste && (
        <div className='mt-4'>
          <p className='text-sm font-semibold text-gray-700 mb-3'>
            Bulto largo (&gt;2.20m) — Elige opción de envío:
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>

            {/* Opción rápida */}
            <button
              type='button'
              onClick={() => form.change('opcionVelocidad', 'rapida')}
              className={`flex-1 p-4 rounded-lg border-2 text-left transition-colors ${
                !esLenta
                  ? 'border-windy-cyan bg-cyan-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <p className='font-semibold text-sm text-gray-700'>Opción rápida</p>
              <p className='text-xs text-gray-400 mb-2'>~48h de tránsito</p>
              <p className='text-2xl font-bold text-gray-900'>{precioRapida}€</p>
            </button>

            {/* Opción lenta */}
            <button
              type='button'
              onClick={() => form.change('opcionVelocidad', 'lenta')}
              className={`flex-1 p-4 rounded-lg border-2 text-left transition-colors ${
                esLenta
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <p className='font-semibold text-sm text-gray-700'>Opción lenta</p>
              <p className='text-xs text-gray-400 mb-2'>~96h de tránsito</p>
              <p className='text-2xl font-bold text-gray-900'>{precioLenta}€</p>
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer precio estimado */}
      {pv !== 0 && (
        <p className='text-gray-400 text-xs mt-3 italic'>
          * Precio estimado (IVA incluido + comisión de gestión). El precio definitivo se confirmará por email antes de gestionar el envío.
        </p>
      )}
    </div>
  );
};

export default FormPaqueteEnvio;
