
'use client';

import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { crearSolicitudEnvio } from '@/reduxLib/slices/envioSolicitudesSlice';
import FormPaqueteEnvio from '@/components/gestionEnvios/FormPaqueteEnvio';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const STORAGE_KEY = 'pendingEnvioData';

const required = (value) => (!value ? 'Campo obligatorio' : undefined);

// suffix es 'Remi' o 'Desti' — mismos nombres de campo que el backend ya conoce
function DatosPersonalesSection({ suffix, titulo }) {
  return (
    <div className='flex-1 bg-white rounded-lg shadow p-4'>
      <h5 className='font-semibold text-base mb-3 border-b pb-2'>{titulo}</h5>
      <div className='space-y-3'>
        <div>
          <Label className='mb-1 text-sm'>Nombre y Apellidos</Label>
          <Field name={`nombre${suffix}`} validate={required}>
            {({ input, meta }) => (
              <>
                <Input {...input} placeholder='Nombre y apellidos' className='mt-1' />
                {meta.error && meta.touched && (
                  <span className='text-red-500 text-xs'>{meta.error}</span>
                )}
              </>
            )}
          </Field>
        </div>
        <div>
          <Label className='mb-1 text-sm'>Dirección</Label>
          <Field name={`direccion${suffix}`} validate={required}>
            {({ input, meta }) => (
              <>
                <Input {...input} placeholder='Calle, número, piso...' className='mt-1' />
                {meta.error && meta.touched && (
                  <span className='text-red-500 text-xs'>{meta.error}</span>
                )}
              </>
            )}
          </Field>
        </div>
        <div>
          <Label className='mb-1 text-sm'>Población y Código Postal</Label>
          <Field name={`poblacion_CP${suffix}`} validate={required}>
            {({ input, meta }) => (
              <>
                <Input {...input} placeholder='Ej: Barcelona 08001' className='mt-1' />
                {meta.error && meta.touched && (
                  <span className='text-red-500 text-xs'>{meta.error}</span>
                )}
              </>
            )}
          </Field>
        </div>
        <div>
          <Label className='mb-1 text-sm'>Teléfono Móvil</Label>
          <Field name={`telefono${suffix}`} validate={required}>
            {({ input, meta }) => (
              <>
                <Input {...input} type='tel' placeholder='6XX XXX XXX' className='mt-1' />
                {meta.error && meta.touched && (
                  <span className='text-red-500 text-xs'>{meta.error}</span>
                )}
              </>
            )}
          </Field>
        </div>
        <div>
          <Label className='mb-1 text-sm'>Email</Label>
          <Field name={`email${suffix}`} validate={required}>
            {({ input, meta }) => (
              <>
                <Input {...input} type='email' placeholder='correo@ejemplo.com' className='mt-1' />
                {meta.error && meta.touched && (
                  <span className='text-red-500 text-xs'>{meta.error}</span>
                )}
              </>
            )}
          </Field>
        </div>
      </div>
    </div>
  );
}

export default function HandleDelivery() {
  const dispatch = useDispatch();
  const router = useRouter();
  const usuario = useSelector((state) => state.users.user);

  // Cuando el usuario vuelve tras registrarse: limpiar datos guardados y felicitarle
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && usuario) {
      localStorage.removeItem(STORAGE_KEY);
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Tus datos de envío se han recuperado. Revísalos y envía la solicitud.',
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }, [usuario]);

  // Valores iniciales: desde localStorage si vuelve tras registro, si no desde Redux/vacío
  const getInitialValues = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Si ahora tiene sesión, rellenar también los datos del remitente con los del usuario
        return {
          ...parsed,
          nombreRemi: usuario?.nombre || parsed.nombreRemi || '',
          telefonoRemi: usuario?.telefono || parsed.telefonoRemi || '',
          emailRemi: usuario?.email || parsed.emailRemi || '',
        };
      } catch {
        // datos corruptos, ignorar
      }
    }
    return {
      nombreRemi: usuario?.nombre || '',
      telefonoRemi: usuario?.telefono || '',
      emailRemi: usuario?.email || '',
      direccionRemi: usuario?.direccion === 'undefined' ? '' : usuario?.direccion || '',
      poblacion_CPRemi: usuario?.poblacion_CP || '',
      nombreDesti: '',
      telefonoDesti: '',
      emailDesti: '',
      direccionDesti: '',
      poblacion_CPDesti: '',
    };
  };

  const onSubmit = (values) => {
    if (!usuario) {
      // Guardar el formulario para restaurarlo después del registro
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...values, savedAt: new Date().toISOString() }));

      Swal.fire({
        title: '¡Casi listo!',
        html: `
          <div style="text-align:left; padding: 0.5rem 0;">
            <p style="margin-bottom:1rem;">
              Para gestionar tu envío necesitamos poder contactarte.
              <strong>¿Tienes cuenta en WindyMarket?</strong>
            </p>
            <p style="color:#666; font-size:0.85rem; line-height:1.6;">
              ✅ Tus datos están guardados<br>
              ✅ Registro gratuito, menos de 1 minuto<br>
              ✅ Accede a todos los productos del marketplace
            </p>
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Crear cuenta gratis',
        denyButtonText: 'Ya tengo cuenta',
        cancelButtonText: 'Continuar sin registro',
        confirmButtonColor: '#38d9df',
        denyButtonColor: '#6b7280',
        cancelButtonColor: '#e5e7eb',
        customClass: { cancelButton: '!text-gray-700' },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/nuevousuario');
        } else if (result.isDenied) {
          router.push('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Continúa sin registro — limpiamos el storage y enviamos
          localStorage.removeItem(STORAGE_KEY);
          dispatch(crearSolicitudEnvio(values))
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: '¡Solicitud enviada!',
                html: 'Recibirás un email con el <strong>precio definitivo</strong> en breve.',
                confirmButtonColor: '#38d9df',
              }).then(() => router.push('/'));
            });
        }
      });
      return;
    }

    // Usuario con sesión → enviar directamente
    dispatch(crearSolicitudEnvio(values))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Solicitud enviada!',
          html: 'Recibirás un email con el <strong>precio definitivo</strong> en breve.',
          confirmButtonColor: '#38d9df',
        }).then(() => router.push('/'));
      });
  };

  return (
    <div className='main-container rounded my-4 p-4'>
      <h2 className='text-center font-bold mb-1 font-saira text-2xl'>Gestión de Envíos</h2>
      <p className='text-center text-gray-500 mb-6 text-sm'>
        Gestiona el envío de cualquier paquete aunque el producto no esté en nuestro marketplace.
      </p>

      {!usuario && (
        <div className='bg-blue-50 border-l-4 border-blue-400 p-3 mb-5 rounded text-sm text-blue-700'>
          <strong>Tip:</strong> Si tienes cuenta,{' '}
          <a href='/login' className='underline font-medium'>
            inicia sesión
          </a>{' '}
          para rellenar tus datos automáticamente.
        </div>
      )}

      <Form
        onSubmit={onSubmit}
        initialValues={getInitialValues()}
        render={({ handleSubmit, values, form, submitting }) => (
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Remitente y Destinatario lado a lado */}
            <div className='flex flex-col lg:flex-row gap-4'>
              <DatosPersonalesSection suffix='Remi' titulo='Remitente (quien envía)' />
              <DatosPersonalesSection suffix='Desti' titulo='Destinatario (quien recibe)' />
            </div>

            {/* Paquete + cálculo automático de precio */}
            <div className='bg-white rounded-lg shadow p-4'>
              <h5 className='font-semibold text-base mb-1 border-b pb-2'>Datos del Paquete</h5>
              <FormPaqueteEnvio
                alto={values.alto}
                ancho={values.ancho}
                largo={values.largo}
                pesoVolumetrico={values.pesoVolumetrico}
                pesoKgs={values.pesoKgs}
                balearicDelivery={values.balearicDelivery}
                opcionVelocidad={values.opcionVelocidad}
                form={form}
              />
            </div>

            {/* Recogida del paquete */}
            <div className='bg-white rounded-lg shadow p-4'>
              <h5 className='font-semibold text-base mb-3 border-b pb-2'>Recogida del paquete</h5>
              <Field name='tipoRecogida' validate={required}>
                {({ input, meta }) => (
                  <div className='space-y-3'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                      <label className={`flex-1 flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${input.value === 'domicilio' ? 'border-windy-cyan bg-cyan-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type='radio'
                          {...input}
                          value='domicilio'
                          checked={input.value === 'domicilio'}
                          className='mt-0.5 accent-cyan-500'
                        />
                        <div>
                          <p className='font-medium text-sm'>Recogida en domicilio</p>
                          <p className='text-xs text-gray-500'>El transportista recoge el paquete en tu dirección</p>
                        </div>
                      </label>
                      <label className={`flex-1 flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${input.value === 'punto' ? 'border-windy-cyan bg-cyan-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type='radio'
                          {...input}
                          value='punto'
                          checked={input.value === 'punto'}
                          className='mt-0.5 accent-cyan-500'
                        />
                        <div>
                          <p className='font-medium text-sm'>Lo llevo a punto de recogida</p>
                          <p className='text-xs text-gray-500'>Te indicamos el punto más cercano a tu CP</p>
                        </div>
                      </label>
                    </div>
                    {meta.error && meta.touched && (
                      <span className='text-red-500 text-xs'>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              {/* Franja horaria: solo si recogida en domicilio */}
              {values.tipoRecogida === 'domicilio' && (
                <div className='mt-4'>
                  <Label className='mb-1 text-sm'>Franja horaria preferida</Label>
                  <Field name='franjaHoraria' validate={required}>
                    {({ input, meta }) => (
                      <>
                        <Select onValueChange={input.onChange} value={input.value}>
                          <SelectTrigger className='mt-1'>
                            <SelectValue placeholder='Selecciona una franja...' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='manana'>Mañana: 9:00 – 14:00h</SelectItem>
                            <SelectItem value='tarde'>Tarde: 14:00 – 19:00h</SelectItem>
                            <SelectItem value='dia_completo'>Día completo: 9:00 – 19:00h</SelectItem>
                          </SelectContent>
                        </Select>
                        {meta.error && meta.touched && (
                          <span className='text-red-500 text-xs'>{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
              )}

              {/* Info punto de recogida */}
              {values.tipoRecogida === 'punto' && (
                <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800'>
                  Una vez enviada la solicitud, te indicaremos el punto de recogida más cercano a tu código postal.
                </div>
              )}
            </div>

            <div className='text-center'>
              <Button
                type='submit'
                variant='outline'
                disabled={submitting}
                className='border-green-500 text-green-600 hover:bg-green-50 px-8'
              >
                Solicitar Gestión de Envío
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
