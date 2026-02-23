import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import EnvioSolicitudesService from '../services/envioSolicitudes.service';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const crearSolicitudEnvio = createAsyncThunk(
  'envioSolicitudes/crear',
  async (solicitudData, { rejectWithValue }) => {
    try {
      const response = await EnvioSolicitudesService.crearSolicitud(solicitudData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerSolicitudesEnvio = createAsyncThunk(
  'envioSolicitudes/obtener',
  async (_, { rejectWithValue }) => {
    try {
      const response = await EnvioSolicitudesService.obtenerSolicitudes();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmarSolicitudEnvio = createAsyncThunk(
  'envioSolicitudes/confirmar',
  async ({ id, precioReal, notas }, { rejectWithValue }) => {
    try {
      const response = await EnvioSolicitudesService.confirmarSolicitud({ id, precioReal, notas });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const marcarPagadoSolicitudEnvio = createAsyncThunk(
  'envioSolicitudes/marcarPagado',
  async (id, { rejectWithValue }) => {
    try {
      const response = await EnvioSolicitudesService.marcarPagado(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completarSolicitudEnvio = createAsyncThunk(
  'envioSolicitudes/completar',
  async ({ id, files }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (files) {
        Array.from(files).forEach((file) => formData.append('etiquetas', file));
      }
      const response = await EnvioSolicitudesService.completarSolicitud(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const envioSolicitudesSlice = createSlice({
  name: 'envioSolicitudes',
  initialState: {
    solicitudes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Crear solicitud
    builder.addCase(crearSolicitudEnvio.pending, () => {
      Swal.fire({ title: 'Enviando solicitud...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    });
    builder.addCase(crearSolicitudEnvio.fulfilled, () => {
      Swal.close();
    });
    builder.addCase(crearSolicitudEnvio.rejected, (state, action) => {
      state.error = action.payload;
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo enviar la solicitud. Inténtalo de nuevo.' });
    });

    // Obtener solicitudes (admin)
    builder.addCase(obtenerSolicitudesEnvio.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(obtenerSolicitudesEnvio.fulfilled, (state, action) => {
      state.loading = false;
      state.solicitudes = action.payload;
    });
    builder.addCase(obtenerSolicitudesEnvio.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Confirmar solicitud (admin)
    builder.addCase(confirmarSolicitudEnvio.fulfilled, (state, action) => {
      const idx = state.solicitudes.findIndex((s) => s._id === action.payload._id);
      if (idx !== -1) state.solicitudes[idx] = action.payload;
      Swal.fire({
        icon: 'success',
        title: 'Confirmado',
        text: 'Email de confirmación enviado al cliente.',
        timer: 2000,
        showConfirmButton: false,
      });
    });
    builder.addCase(confirmarSolicitudEnvio.rejected, (state, action) => {
      state.error = action.payload;
      Swal.fire({ icon: 'error', title: 'Error al confirmar', text: action.payload });
    });

    // Marcar pago recibido (admin)
    builder.addCase(marcarPagadoSolicitudEnvio.fulfilled, (state, action) => {
      const idx = state.solicitudes.findIndex((s) => s._id === action.payload._id);
      if (idx !== -1) state.solicitudes[idx] = action.payload;
      Swal.fire({
        icon: 'success',
        title: '¡Pago registrado!',
        text: 'Ahora puedes enviar las etiquetas.',
        timer: 2000,
        showConfirmButton: false,
      });
    });
    builder.addCase(marcarPagadoSolicitudEnvio.rejected, (state, action) => {
      state.error = action.payload;
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar el pago.' });
    });

    // Completar solicitud (etiquetas enviadas al cliente)
    builder.addCase(completarSolicitudEnvio.pending, () => {
      Swal.fire({ title: 'Enviando etiquetas...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    });
    builder.addCase(completarSolicitudEnvio.fulfilled, (state, action) => {
      const idx = state.solicitudes.findIndex((s) => s._id === action.payload._id);
      if (idx !== -1) state.solicitudes[idx] = action.payload;
      Swal.fire({
        icon: 'success',
        title: '¡Etiquetas enviadas!',
        text: 'El cliente ha recibido las etiquetas por email.',
        timer: 2500,
        showConfirmButton: false,
      });
    });
    builder.addCase(completarSolicitudEnvio.rejected, (state, action) => {
      state.error = action.payload;
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo completar. ¿Está marcado el pago?' });
    });
  },
});

export default envioSolicitudesSlice.reducer;
