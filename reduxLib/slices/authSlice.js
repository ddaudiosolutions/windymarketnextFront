import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../services/auth.service';
import Swal from 'sweetalert2';
import { navigateTo } from '@/helpers/navigation';

const initialState = [];

export const resetPassword = createAsyncThunk(
  'user/reset-password',
  async (email, { rejectedWithValue }) => {
    try {
      const res = await AuthServices.resetPassword(email);
      return res;
    } catch (e) {
      throw rejectedWithValue(e.message);
    }
  }
);

export const changePasswordUser = createAsyncThunk('user/changePasswordUser', async (data) => {
  const res = await AuthServices.changePasswordUser(data);
  return res;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload
    }); */
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'Hemos enviado un email con las instrucciones', 'success').then(
          function () {
            navigateTo('/login');
          }
        );
      }
      return action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      Swal.fire(
        'Vuelve a introducir el correo',
        'El correo no es correcto o no está registrado en WindyMarket. ',
        'error'
      ).then(function () {
        navigateTo('/forgotpassword');
      });

      return action.payload;
    });
    builder.addCase(changePasswordUser.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire(
          'Correcto',
          'La Contraseña se ha cambiado con éxito, ya puedes acceder a WindyMarket',
          'success'
        ).then(function () {
          navigateTo('/login');
        });
      }
      return action.payload;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
