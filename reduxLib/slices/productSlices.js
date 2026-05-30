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
  async (pageAndData, { rejectWithValue }) => {
    try {
      const response = await ProductService.obtenerCategoriaActions(pageAndData);
      // Solo devolver los datos, no toda la respuesta de Axios
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerNumeroVistasProducto = createAsyncThunk(
  'getViewsProduct / GET',
  async (data, { rejectedWithValue }) => {
    try {
      const productViews = await ProductService.obtenerNumeroVistasProducto(data);
      return productViews.data;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosMasVistos = createAsyncThunk(
  'getMostViewedProducts / GET',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProductService.obtenerProductosMasVistos();
      console.log('Productos más vistos recibidos:', response.data);
      // Solo devolver los datos, no toda la respuesta de Axios
      return response.data;
    } catch (error) {
      console.error('Error obteniendo productos más vistos:', error);
      console.error('Error response:', error.response?.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const crearNuevoProducto = createAsyncThunk(
  'newProduct / POST',
  async (productData, { rejectedWithValue }) => {
    try {
      const products = await ProductService.crearNuevoProductoAction(productData);
      // Enviar email de confirmación automáticamente (fire & forget)
      const productoId = products?.data?.producto?._id || products?.data?._id;
      if (productoId) {
        ProductService.sendEmailProductoPublicado({ productoId }).catch(() => {});
      }
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

export const reactivarProducto = createAsyncThunk(
  'reactivarProducto / POST',
  async (productoId, { rejectedWithValue }) => {
    try {
      const response = await ProductService.reactivarProducto(productoId);
      return response;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const desactivarProducto = createAsyncThunk(
  'desactivarProducto / POST',
  async (productoId, { rejectWithValue }) => {
    try {
      const response = await ProductService.desactivarProducto(productoId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
      state.productos = action.payload;
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
      console.log('✅ Productos más vistos:', action.payload);
      state.productosMasVistos = action.payload?.productosVistas || [];
    });
    builder.addCase(obtenerProductosMasVistos.rejected, (state, action) => {
      console.warn(
        '⚠️ No se pudieron cargar productos más vistos:',
        action.payload || action.error
      );
      state.productosMasVistos = [];
    });
    builder.addCase(crearNuevoProducto.pending, (state, action) => {
      Swal.fire('Subiendo Producto');
      Swal.showLoading();
    });
    builder.addCase(crearNuevoProducto.fulfilled, (state, action) => {
      const productoId = action.payload?.data?.producto?._id || action.payload?.data?._id;
      const productUrl = productoId
        ? `https://windymarket.es/productos/${productoId}`
        : 'https://windymarket.es';
      const whatsappMsg = encodeURIComponent(
        `🏄 ¡Mi anuncio ya está publicado en WindyMarket! Échale un vistazo: ${productUrl}`
      );
      const whatsappUrl = `https://wa.me/?text=${whatsappMsg}`;

      Swal.fire({
        title: '¡Tu anuncio ya está publicado! 🚀',
        html: `
          <p style="margin-bottom: 1.2rem; color: #555;">Compártelo con otros riders y vende más rápido</p>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 0.5rem; background-color: #25D366; color: white; padding: 0.65rem 1.4rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; font-size: 1rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir en WhatsApp
          </a>
        `,
        icon: 'success',
        confirmButtonText: 'Ver mi anuncio',
        confirmButtonColor: '#38d9df',
        showCancelButton: true,
        cancelButtonText: 'Ir al inicio',
        cancelButtonColor: '#aaa',
      }).then(function (result) {
        if (result.isConfirmed && productoId) {
          navigateTo(`/productos/${productoId}`);
        } else {
          navigateTo('/');
        }
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
        // Actualizar el producto editado en el estado
        if (action.payload.data) {
          state.productToEdit = action.payload.data;
        }
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
    builder.addCase(obtenerNumeroVistasProducto.fulfilled, (state, action) => {
      state.productViews = action.payload.eventos;
    });
    builder.addCase(obtenerNumeroVistasProducto.rejected, (state, action) => {
      // Si no hay datos de vistas (404 u otro error), establecer en 0
      state.productViews = 0;
    });
    builder.addCase(reactivarProducto.fulfilled, (state, action) => {
      Swal.fire('Correcto', 'Producto reactivado con éxito', 'success');
    });
    builder.addCase(reactivarProducto.rejected, (state, action) => {
      Swal.fire('Error', 'No se pudo reactivar el producto', 'error');
    });
    builder.addCase(desactivarProducto.fulfilled, () => {
      Swal.fire('Correcto', 'Producto deshabilitado. Ya no es visible en el catálogo.', 'success');
    });
    builder.addCase(desactivarProducto.rejected, () => {
      Swal.fire('Error', 'No se pudo deshabilitar el producto', 'error');
    });
  },
});

export const { setProductId, setProductToEdit, clearProductsByWords } = productsSlices.actions;
const { reducer } = productsSlices;
export default reducer;
