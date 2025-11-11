'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { initGA, logPageView } from '../../lib/gtag';

const AnalyticsData = () => {
  const router = useRouter();
  useEffect(() => {
    // Inicializa Google Analytics
    initGA();

    // Registra la primera vista de página
    logPageView(window.location.pathname + window.location.search);

    // Registra vistas de página en cada cambio de ruta
    const handleRouteChange = (url) => {
      logPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Limpia el evento al desmontar el componente
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return null;
};

export default AnalyticsData;
