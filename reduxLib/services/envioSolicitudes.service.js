import apiClient from '@/lib/apiClient';

// Crear nueva solicitud de envío (guarda en BD + notifica a admin por email)
const crearSolicitud = (solicitudData) =>
  apiClient.post('envios/solicitudes', solicitudData);

// Obtener todas las solicitudes (solo admin)
const obtenerSolicitudes = () =>
  apiClient.get('envios/solicitudes');

// Confirmar solicitud con precio real (admin) → envía email al cliente
const confirmarSolicitud = ({ id, precioReal, notas }) =>
  apiClient.put(`envios/solicitudes/${id}/confirmar`, { precioReal, notas });

// Marcar como completada (pegatinas enviadas)
const completarSolicitud = (id) =>
  apiClient.put(`envios/solicitudes/${id}/completar`);

const EnvioSolicitudesService = {
  crearSolicitud,
  obtenerSolicitudes,
  confirmarSolicitud,
  completarSolicitud,
};

export default EnvioSolicitudesService;
