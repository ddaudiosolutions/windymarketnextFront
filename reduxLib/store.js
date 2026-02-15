import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '../lib/storage';
import productsReducer from './slices/productSlices';
import usersReducer from './slices/usersSlice';
import favoriteProductsReducer from './slices/favoriteProductsSlice';
import authReducer from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'], // solo users
};

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  favoriteProducts: favoriteProductsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
