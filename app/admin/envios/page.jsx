'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  obtenerSolicitudesEnvio,
  confirmarSolicitudEnvio,
  completarSolicitudEnvio,
} from '@/reduxLib/slices/envioSolicitudesSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const ESTADO_LABEL = {
  pendiente:   { text: 'Pendiente',    color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  confirmada:  { text: 'Confirmada',   color: 'bg-blue-100 text-blue-800 border-blue-300' },
  completada:  { text: 'Completada',   color: 'bg-green-100 text-green-800 border-green-300' },
};

const FRANJA_LABEL = {
  manana:      'Mañana (9:00–14:00h)',
  tarde:       'Tarde (14:00–19:00h)',
  dia_completo:'Día completo (9:00–19:00h)',
};

function EstadoBadge({ estado }) {
  const cfg = ESTADO_LABEL[estado] || ESTADO_LABEL.pendiente;
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border ${cfg.color}`}>
      {cfg.text}
    </span>
  );
}

function SolicitudRow({ solicitud, onConfirmar, onCompletar }) {
  const [open, setOpen] = useState(false);
  const [precioReal, setPrecioReal] = useState('');
  const [notas, setNotas] = useState('');

  const fecha = new Date(solicitud.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden mb-3'>
      {/* Cabecera de fila */}
      <button
        className='w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-left'
        onClick={() => setOpen((v) => !v)}
      >
        <div className='flex items-center gap-3 flex-wrap'>
          <EstadoBadge estado={solicitud.estado} />
          <span className='font-medium text-sm'>{solicitud.nombreRemi}</span>
          <span className='text-gray-400 text-xs'>→</span>
          <span className='text-sm'>{solicitud.nombreDesti}</span>
          <span className='text-gray-400 text-xs hidden sm:block'>{fecha}</span>
        </div>
        <div className='flex items-center gap-3 flex-shrink-0'>
          <span className='text-sm font-semibold text-gray-600'>
            ~{solicitud.precioEstimado}€
            {solicitud.precioReal && (
              <span className='ml-2 text-green-600 font-bold'>→ {solicitud.precioReal}€ real</span>
            )}
          </span>
          <span className='text-gray-400 text-lg'>{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Detalle expandible */}
      {open && (
        <div className='border-t border-gray-100 p-4 bg-gray-50 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>

            {/* Remitente */}
            <div>
              <h6 className='font-semibold mb-2 text-gray-700'>Remitente</h6>
              <p>{solicitud.nombreRemi}</p>
              <p className='text-gray-500'>{solicitud.direccionRemi}</p>
              <p className='text-gray-500'>{solicitud.poblacion_CPRemi}</p>
              <p className='text-gray-500'>{solicitud.telefonoRemi}</p>
              <p className='text-gray-500'>{solicitud.emailRemi}</p>
            </div>

            {/* Destinatario */}
            <div>
              <h6 className='font-semibold mb-2 text-gray-700'>Destinatario</h6>
              <p>{solicitud.nombreDesti}</p>
              <p className='text-gray-500'>{solicitud.direccionDesti}</p>
              <p className='text-gray-500'>{solicitud.poblacion_CPDesti}</p>
              <p className='text-gray-500'>{solicitud.telefonoDesti}</p>
              <p className='text-gray-500'>{solicitud.emailDesti}</p>
            </div>

            {/* Paquete + Recogida */}
            <div>
              <h6 className='font-semibold mb-2 text-gray-700'>Paquete</h6>
              {solicitud.alto && (
                <p>Medidas: {solicitud.largo}×{solicitud.ancho}×{solicitud.alto} m</p>
              )}
              {solicitud.pesoVolumetrico > 0 && (
                <p>Vol: <strong>{solicitud.pesoVolumetrico} m³</strong></p>
              )}
              {solicitud.pesoKgs > 0 && (
                <p>Peso: <strong>{solicitud.pesoKgs} kg</strong></p>
              )}
              {solicitud.balearicDelivery && (
                <p className='text-orange-600 font-medium'>🏝 Baleares</p>
              )}
              <p className='mt-2'>
                <span className='font-medium'>Recogida:</span>{' '}
                {solicitud.tipoRecogida === 'domicilio'
                  ? `Domicilio — ${FRANJA_LABEL[solicitud.franjaHoraria] || solicitud.franjaHoraria}`
                  : 'Punto de recogida'}
              </p>
              <p className='mt-1 text-gray-500'>
                Precio estimado: <strong>{solicitud.precioEstimado}€</strong>
              </p>
              {solicitud.notas && (
                <p className='mt-1 text-gray-500 italic'>Nota: {solicitud.notas}</p>
              )}
            </div>
          </div>

          {/* Acciones según estado */}
          {solicitud.estado === 'pendiente' && (
            <div className='border-t pt-4'>
              <p className='text-sm font-semibold mb-3 text-gray-700'>Confirmar con precio real:</p>
              <div className='flex flex-wrap gap-3 items-end'>
                <div>
                  <Label className='text-xs mb-1'>Precio real (€, IVA incluido)</Label>
                  <Input
                    type='number'
                    value={precioReal}
                    onChange={(e) => setPrecioReal(e.target.value)}
                    placeholder='Ej: 67.76'
                    className='w-40'
                  />
                </div>
                <div className='flex-1 min-w-[200px]'>
                  <Label className='text-xs mb-1'>Notas para el cliente (opcional)</Label>
                  <Input
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder='Ej: Recogida jueves, precio incluye sobrecoste'
                  />
                </div>
                <Button
                  variant='outline'
                  disabled={!precioReal}
                  className='border-green-500 text-green-600 hover:bg-green-50'
                  onClick={() => onConfirmar(solicitud._id, precioReal, notas)}
                >
                  Confirmar y enviar email al cliente
                </Button>
              </div>
            </div>
          )}

          {solicitud.estado === 'confirmada' && (
            <div className='border-t pt-4 flex items-center gap-4'>
              <p className='text-sm text-gray-600'>
                Precio confirmado: <strong className='text-green-600'>{solicitud.precioReal}€</strong>
              </p>
              <Button
                variant='outline'
                className='border-blue-500 text-blue-600 hover:bg-blue-50'
                onClick={() => onCompletar(solicitud._id)}
              >
                Marcar como completada (pegatinas enviadas)
              </Button>
            </div>
          )}

          {solicitud.estado === 'completada' && (
            <div className='border-t pt-3'>
              <p className='text-sm text-green-600 font-medium'>✓ Envío completado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminEnviosPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { solicitudes, loading } = useSelector((state) => state.envioSolicitudes);
  const usuario = useSelector((state) => state.users.user);
  const [filtro, setFiltro] = useState('pendiente');

  useEffect(() => {
    if (!usuario?.isAdmin) {
      router.replace('/');
      return;
    }
    dispatch(obtenerSolicitudesEnvio());
  }, [dispatch, usuario, router]);

  const solicitudesFiltradas = filtro === 'todas'
    ? solicitudes
    : solicitudes.filter((s) => s.estado === filtro);

  const conteo = {
    pendiente:  solicitudes.filter((s) => s.estado === 'pendiente').length,
    confirmada: solicitudes.filter((s) => s.estado === 'confirmada').length,
    completada: solicitudes.filter((s) => s.estado === 'completada').length,
  };

  const handleConfirmar = (id, precioReal, notas) => {
    dispatch(confirmarSolicitudEnvio({ id, precioReal: parseFloat(precioReal), notas }));
  };

  const handleCompletar = (id) => {
    dispatch(completarSolicitudEnvio(id));
  };

  if (!usuario?.isAdmin) return null;

  return (
    <div className='main-container my-4 p-4'>
      <h2 className='font-bold text-2xl font-saira mb-1'>Panel — Solicitudes de Envío</h2>
      <p className='text-gray-500 text-sm mb-6'>Confirma el precio real y gestiona cada solicitud.</p>

      {/* Filtros con conteo */}
      <div className='flex flex-wrap gap-2 mb-6'>
        {[
          { key: 'pendiente',  label: `Pendientes (${conteo.pendiente})` },
          { key: 'confirmada', label: `Confirmadas (${conteo.confirmada})` },
          { key: 'completada', label: `Completadas (${conteo.completada})` },
          { key: 'todas',      label: `Todas (${solicitudes.length})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFiltro(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filtro === key
                ? 'bg-windy-cyan text-white border-windy-cyan'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => dispatch(obtenerSolicitudesEnvio())}
          className='ml-auto px-3 py-1.5 rounded-full text-sm border border-gray-300 text-gray-500 hover:bg-gray-50'
        >
          ↻ Actualizar
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <p className='text-center text-gray-400 py-12'>Cargando solicitudes...</p>
      ) : solicitudesFiltradas.length === 0 ? (
        <p className='text-center text-gray-400 py-12'>No hay solicitudes en este estado.</p>
      ) : (
        solicitudesFiltradas.map((s) => (
          <SolicitudRow
            key={s._id}
            solicitud={s}
            onConfirmar={handleConfirmar}
            onCompletar={handleCompletar}
          />
        ))
      )}
    </div>
  );
}
