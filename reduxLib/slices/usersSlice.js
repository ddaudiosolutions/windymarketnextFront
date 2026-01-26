import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from '../services/user.service';
import Swal from 'sweetalert2';
import { navigateTo } from '@/helpers/navigation';

const initialState = {
  user: undefined,
  statusSendEmail: undefined,
};

export const nuevoUsuario = createAsyncThunk(
  'createUser / post',
  async (newUserData, { rejectWithValue }) => {
    try {
      const newUser = await UsersService.registroUsuario(newUserData);
      return newUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUsuario = createAsyncThunk(
  'loginUser / post',
  async (userData, { rejectWithValue }) => {
    try {
      const user = await UsersService.loginUsuarioActions(userData);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerDatosUsuario = createAsyncThunk(
  'getUserData / get',
  async (userId, { rejectWithValue }) => {
    try {
      const user = await UsersService.obtenerDatosUsuario(userId);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editarDatosUsuario = createAsyncThunk(
  'editUserData / put',
  async (data, { rejectWithValue }) => {
    try {
      const user = await UsersService.editarUsuario(data);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUsuario = createAsyncThunk(
  'logOut / post',
  async (nombreUser, { rejectWithValue }) => {
    try {
      const isLogOut = await UsersService.logoutUsuario(nombreUser);
      return isLogOut;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const eliminarUsuario = createAsyncThunk(
  'removeUser / delete',
  async (id, { rejectWithValue }) => {
    try {
      const user = await UsersService.eliminarUsuario(id);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFavoriteProduct = createAsyncThunk(
  'addFavoriteProduct / POST',
  async (favoriteProductData, { rejectedWithValue }) => {
    try {
      const addFavoriteProduct = await UsersService.addFavoriteProduct(favoriteProductData);
      return addFavoriteProduct;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const removeFavoriteProduct = createAsyncThunk(
  'removeFavoriteProduct / POST',
  async (productId, { rejectedWithValue }) => {
    try {
      const removeFavoriteProduct = await UsersService.removeFavorite(productId);
      return removeFavoriteProduct;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const sendMailToUser = createAsyncThunk(
  'sendMailToUser / POST',
  async (dataToSend, { rejectedWithValue }) => {
    try {
      const sendMailToUser = await UsersService.sendMailToUser(dataToSend);
      return sendMailToUser;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const usersSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(nuevoUsuario.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El Usuario se ha creado Correctamente', 'success').then(function () {
          navigateTo('/login');
        });
      }
    });
    builder.addCase(nuevoUsuario.rejected, (state, action) => {
      if (action.payload.response.status === 403) {
        Swal.fire('Error', 'El Usuario ya existe', 'error').then(function () {
          navigateTo('/login');
        });
      }
    });
    builder.addCase(loginUsuario.fulfilled, (state, action) => {
      const userData = action.payload.data;

      // guardamos usuario y token en Redux
      state.user = { ...userData, _id: userData.id };
      state.token = userData.accessToken;
    });

    builder.addCase(loginUsuario.rejected, (state, action) => {
      if (action.payload.status !== 200) {
        Swal.fire('Error', 'Usuario o Contraseña Incorrectos', 'error').then(function () {
          navigateTo('/login');
        });
      }
    });
    builder.addCase(obtenerDatosUsuario.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(obtenerDatosUsuario.rejected, (state, action) => {
      if (action.payload.response.status === 401) {
        state.user = null;
      }
    });
    builder.addCase(editarDatosUsuario.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El Usuario se ha editado Correctamente', 'success').then(
          function () {
            navigateTo('/');
          }
        );
      }
    });
    builder.addCase(logOutUsuario.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
      navigateTo('/');
    });
    builder.addCase(eliminarUsuario.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
      Swal.fire('Correct', 'Usuario Eliminado Correctamente', 'success').then(function () {
        navigateTo('/');
      });
    });
    builder.addCase(addFavoriteProduct.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
    });
    builder.addCase(removeFavoriteProduct.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
    });
    builder.addCase(sendMailToUser.pending, (state, action) => {
      Swal.fire('Enviando Email....');
      Swal.showLoading();
    });
    builder.addCase(sendMailToUser.fulfilled, (state, action) => {
      state.statusSendEmail = action.payload.status;
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El email se ha enviado Correctamente', 'success').then(function () {
          navigateTo('/');
        });
      }
    });
  },
});

export const { clearUser } = usersSlices.actions;
const { reducer } = usersSlices;
export default reducer;
