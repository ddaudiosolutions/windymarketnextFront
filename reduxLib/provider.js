'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from './store';
import { injectTokenGetter } from '@/lib/apiClient';

const Providers = ({ children }) => {
  const storeRef = useRef(null);
  const persistorRef = useRef(null);

  if (!storeRef.current) {
    const { store, persistor } = makeStore();
    storeRef.current = store;
    persistorRef.current = persistor;

    // Inyectamos el getter del token en apiClient
    injectTokenGetter(() => store.getState().users?.token);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
