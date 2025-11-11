import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/productSlices';
import usersReducer from './slices/usersSlice';
import favoriteProductsReducer from './slices/favoriteProductsSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    auth: authReducer,
    favoriteProducts: favoriteProductsReducer,

  }
});
