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

// Marcar pago Bizum recibido (admin)
const marcarPagado = (id) =>
  apiClient.put(`envios/solicitudes/${id}/pago`);

// Marcar como completada y enviar etiquetas adjuntas por email (requiere pagado:true)
const completarSolicitud = (id, formData) =>
  apiClient.put(`envios/solicitudes/${id}/completar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const EnvioSolicitudesService = {
  crearSolicitud,
  obtenerSolicitudes,
  confirmarSolicitud,
  marcarPagado,
  completarSolicitud,
};

export default EnvioSolicitudesService;
