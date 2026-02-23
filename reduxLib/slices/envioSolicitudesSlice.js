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

export const completarSolicitudEnvio = createAsyncThunk(
  'envioSolicitudes/completar',
  async (id, { rejectWithValue }) => {
    try {
      const response = await EnvioSolicitudesService.completarSolicitud(id);
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
      Swal.fire({
        icon: 'success',
        title: '¡Solicitud enviada!',
        html: 'Recibirás un email con el <strong>precio definitivo</strong> en breve.',
        confirmButtonColor: '#38d9df',
      });
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

    // Completar solicitud
    builder.addCase(completarSolicitudEnvio.fulfilled, (state, action) => {
      const idx = state.solicitudes.findIndex((s) => s._id === action.payload._id);
      if (idx !== -1) state.solicitudes[idx] = action.payload;
    });
  },
});

export default envioSolicitudesSlice.reducer;
