import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/productSlices';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer

  }
});
