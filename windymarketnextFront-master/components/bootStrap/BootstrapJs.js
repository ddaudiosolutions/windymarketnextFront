"use client";

import { useEffect } from 'react';

function BootstrapJs() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

export default BootstrapJs;