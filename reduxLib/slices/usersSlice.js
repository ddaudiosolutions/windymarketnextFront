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
      throw rejectWithValue(error);
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
      throw rejectWithValue(error.message);
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
      throw rejectWithValue(error);
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
      throw rejectWithValue(error.message);
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
      throw rejectWithValue(error.message);
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
      throw rejectWithValue(error.message);
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
      throw rejectedWithValue(error.message);
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
      throw rejectedWithValue(error.message);
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
      throw rejectedWithValue(error.message);
    }
  }
);

const usersSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(nuevoUsuario.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El Usuario se ha creado Correctamente', 'success').then(function () {
          navigateTo('/login');
        });
      }
      return action.payload;
    });
    builder.addCase(nuevoUsuario.rejected, (state, action) => {
      if (action.payload.response.status === 403) {
        Swal.fire('Error', 'El Usuario ya existe', 'error').then(function () {
          navigateTo('/login');
        });
      }
      return action.payload;
    });
    builder.addCase(loginUsuario.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        sessionStorage.setItem('userName', action.payload.data.nombre);
        sessionStorage.setItem('userToken', action.payload.data.accessToken);
        sessionStorage.setItem('userId', action.payload.data.id);
        state.user = { ...action.payload.data, _id: action.payload.data.id };
      }
    });
    builder.addCase(loginUsuario.rejected, (state, action) => {
      if (action.payload.status !== 200) {
        Swal.fire('Error', 'Usuario o Contraseña Incorrectos', 'error').then(function () {
          navigateTo('/login');
        });
      }
      return action.payload;
    });
    builder.addCase(obtenerDatosUsuario.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
      };
    });
    builder.addCase(obtenerDatosUsuario.rejected, (state, action) => {
      if (action.payload.response.status === 401) {
        return {
          user: null,
        };
      }
    });
    builder.addCase(editarDatosUsuario.fulfilled, (state, action) => {
      sessionStorage.setItem('userName', action.payload.data.user.nombre);
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El Usuario se ha editado Correctamente', 'success').then(
          function () {
            navigateTo('/');
          }
        );
      }
      return action.payload.data;
    });
    builder.addCase(logOutUsuario.fulfilled, (state, action) => {
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userToken');
      navigateTo('/productos?busqueda=ultimos_productos&page=0');
    });
    builder.addCase(eliminarUsuario.fulfilled, (state, action) => {
      Swal.fire('Correct', 'Usuario Eliminado Correctamente', 'success')
        .then(function () {
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('userToken');
          navigateTo('/productos?busqueda=ultimos_productos&page=0');
        }
        );
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

/* export const {   } = usersSlices.actions; */
const { reducer } = usersSlices;
export default reducer;
