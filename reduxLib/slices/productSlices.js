import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../services/product.service';
import Swal from 'sweetalert2';
import { navigateTo } from '@/helpers/navigation';

const initialState = {
  productos: [],
  productosMasVistos: [],
  productoId: undefined,
  productsAuth: undefined,
  productosUser: undefined,
  productToEdit: undefined,
  productsByWords: [],
};

export const obtenerProductos = createAsyncThunk(
  'getProducts / GET',
  async (pageAndData, { rejectedWithValue }) => {
    try {
      const products = await ProductService.obtenerCategoriaActions(pageAndData);
      return products;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosMasVistos = createAsyncThunk(
  'getMostViewedProducts / GET',
  async (data, { rejectedWithValue }) => {
    /* console.log('entrando en productos mas vistos', data); */
    try {
      const mostviewedProductos = await ProductService.obtenerProductosMasVistos(); /* 
      console.log('mostviewedProductosMasVistos', mostviewedProductos); */
      return mostviewedProductos;
    } catch (error) {
      /* console.log('entrando en productos mas vistos');
      console.log('error mostviewedProductosMasVistos', error); */
      return rejectedWithValue(error.message);
    }
  }
);

export const crearNuevoProducto = createAsyncThunk(
  'newProduct / POST',
  async (productData, { rejectedWithValue }) => {
    try {
      const products = await ProductService.crearNuevoProductoAction(productData);
      return products;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosUser = createAsyncThunk(
  'getProductsUser / GET',
  async (pageNuser, { rejectedWithValue }) => {
    try {
      const products = await ProductService.obtenerProductosUser(pageNuser);
      return products;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductoIdApi = createAsyncThunk(
  'getProductsId / GET',
  async (productoid, { rejectedWithValue }) => {
    try {
      const producto = await ProductService.obtenerProductoIdApi(productoid);
      return producto;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosAuthor = createAsyncThunk(
  'getAuthorProducts / GET',
  async (authorId, { rejectedWithValue }) => {
    try {
      const producto = await ProductService.obtenerProductosAuthor(authorId);
      return producto;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosPorPalabras = createAsyncThunk(
  'obtenerProductosPorPalabras / POST',
  async (words, { rejectedWithValue }) => {
    try {
      const productosByWords = await ProductService.obtenerProductosPorPalabras(words);
      return productosByWords;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const editarProducto = createAsyncThunk(
  'editProduct / PUT',
  async (productData, { rejectedWithValue }) => {
    try {
      const producto = await ProductService.editarProducto(productData);
      return producto;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const borrarProducto = createAsyncThunk(
  'deleteProduct / DELETE',
  async (id, { rejectedWithValue }) => {
    try {
      const products = await ProductService.borrarProducto(id);
      return products;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const sendMailPegatinas = createAsyncThunk(
  'sendMailPegatinas / POST',
  async (emailData, { rejectedWithValue }) => {
    try {
      const sendMailPegatinas = await ProductService.sendMailPegatinas(emailData);
      return sendMailPegatinas;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const changeReservedProductState = createAsyncThunk(
  'changleReservedState / POST',
  async (reservedData, { rejectedWithValue }) => {
    try {
      const reservedState = await ProductService.editReservedState(reservedData);
      return reservedState;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const changeVendidoProductState = createAsyncThunk(
  'changVendioState / POST',
  async (vendidoData, { rejectedWithValue }) => {
    try {
      const vendidoState = await ProductService.editVendidoState(vendidoData);
      return vendidoState;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productoId = action.payload;
    },
    setProductToEdit: (state, action) => {
      state.productToEdit = action.payload;
    },
    clearProductsByWords: (state) => {
      state.productsByWords = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(obtenerProductos.fulfilled, (state, action) => {
      console.log(action.payload);
      state.productos = action.payload.data;
    });
    builder.addCase(obtenerProductos.rejected, (state, action) => {
      Swal.fire({
        title: 'Servidor Caido 2',
        text: `Estamos Teniendo Problemas con el servidor, Esperamos se reestablezca la conexión
      lo antes posible`,
        imageUrl: './WINDMARKET_LOGO_CIRCULO_uadyzn.png',
      }).then(function () {
        navigateTo('/');
      });
    });
    builder.addCase(obtenerProductosMasVistos.fulfilled, (state, action) => {
      console.log(action.payload);
      state.productosMasVistos = action.payload.data;
    });
    builder.addCase(obtenerProductosMasVistos.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(crearNuevoProducto.pending, (state, action) => {
      Swal.fire('Subiendo Producto');
      Swal.showLoading();
    });
    builder.addCase(crearNuevoProducto.fulfilled, (state, action) => {
      Swal.fire('Correcto', 'PRODUCTO CREADO CON EXITO', 'success').then(function () {
        navigateTo('/');
      });
    });
    builder.addCase(obtenerProductosUser.fulfilled, (state, action) => {
      state.productosUser = action.payload.data.prodUser;
    });
    builder.addCase(obtenerProductosAuthor.fulfilled, (state, action) => {
      state.productsAuth = action.payload.data.prodAuth;
    });

    builder.addCase(obtenerProductosPorPalabras.fulfilled, (state, action) => {
      state.productsByWords = action.payload.data.prodByWords;
    });

    builder.addCase(obtenerProductoIdApi.fulfilled, (state, action) => {
      state.productoId = action.payload.data;
    });

    builder.addCase(borrarProducto.fulfilled, (state, action) => {
      Swal.fire('Correcto', 'PRODUCTO ELIMINADO CON EXITO', 'success');
    });
    builder.addCase(editarProducto.pending, (state, action) => {
      Swal.fire('Subiendo Producto Editado');
      Swal.showLoading();
    });
    builder.addCase(editarProducto.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'Producto Editado con Exito', 'success').then(function () {
          navigateTo(`/`);
        });
      }
    });
    builder.addCase(sendMailPegatinas.pending, (state, action) => {
      Swal.fire('Enviando Email....');
      Swal.showLoading();
    });
    builder.addCase(sendMailPegatinas.fulfilled, (state, action) => {
      state.statusSendEmail = action.payload.status;
      if (action.payload.status === 200) {
        Swal.fire({
          title: 'Correcto',
          text: `Email Enviado!! en breve recibiar un email con el precio definitivo 
            y el enlace de pago.
            Gracias por confiar tu envio a WindyMarket`,
          icon: 'success',
        }).then(function () {
          navigateTo('/');
        });
      }
    });
    builder.addCase(changeReservedProductState.fulfilled, (state, action) => {
      state.statusChangeReserved = action.payload.status;
    });
    builder.addCase(changeVendidoProductState.fulfilled, (state, action) => {
      state.changeVendidoProductState = action.payload.status;
    });
  },
});

export const { setProductId, setProductToEdit, clearProductsByWords } = productsSlices.actions;
const { reducer } = productsSlices;
export default reducer;
