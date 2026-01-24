'use client';

import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    // Importar Bootstrap JS solo en el cliente
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

export default BootstrapClient;
