
export const calculoPesoVolumetrico = (alto, ancho, largo) => {
  if (alto && ancho && largo) {
    return alto * ancho * largo;
  } else {
    return 0;
  }
};

const categoriaEnvioPensinsular = (pesoVolumetrico) => {
  if (pesoVolumetrico <= 0.12) return 0;
  if (pesoVolumetrico > 0.12 && pesoVolumetrico <= 0.17) return 1;
  if (pesoVolumetrico > 0.17 && pesoVolumetrico <= 0.24) return 2;
  if (pesoVolumetrico > 0.24 && pesoVolumetrico <= 0.28) return 3;
  if (pesoVolumetrico > 0.28 && pesoVolumetrico <= 0.33) return 4;
  if (pesoVolumetrico > 0.33 && pesoVolumetrico <= 0.38) return 5;
  if (pesoVolumetrico > 0.38 && pesoVolumetrico <= 0.43) return 6;
  if (pesoVolumetrico > 0.43 && pesoVolumetrico <= 0.48) return 7;
  if (pesoVolumetrico > 0.48 && pesoVolumetrico <= 0.53) return 8;
  if (pesoVolumetrico > 0.53 && pesoVolumetrico <= 0.58) return 9;
  if (pesoVolumetrico > 0.58 && pesoVolumetrico <= 0.63) return 10;
  if (pesoVolumetrico > 0.63 && pesoVolumetrico <= 0.68) return 11;
};

const categoriaEnvioBaleares = (pesoVolumetrico) => {
  if (pesoVolumetrico <= 0.12) return 0;
  if (pesoVolumetrico > 0.12 && pesoVolumetrico <= 0.17) return 1;
  if (pesoVolumetrico > 0.17 && pesoVolumetrico <= 0.24) return 2;
  if (pesoVolumetrico > 0.24 && pesoVolumetrico <= 0.28) return 3;
  if (pesoVolumetrico > 0.28 && pesoVolumetrico <= 0.33) return 4;
  if (pesoVolumetrico > 0.33 && pesoVolumetrico <= 0.38) return 5;
};

export const calculoPrecioEnvio = (pesoVolumetrico, balearicDelivery) => {
  const comision = 5;
  const categoria = balearicDelivery === true ?
    categoriaEnvioBaleares(pesoVolumetrico) : categoriaEnvioPensinsular(pesoVolumetrico);
  let tarifaBase;
  const iva = 0.21;
  switch (categoria) {
    case 0:
      tarifaBase = balearicDelivery ? 39 : 24;
      return ((tarifaBase * (1 + iva)) + comision);
    case 1:
      tarifaBase = balearicDelivery ? 46 : 30;
      return ((tarifaBase * (1 + iva)) + comision);
    case 2:
      tarifaBase = balearicDelivery ? 58 : 38;
      return ((tarifaBase * (1 + iva)) + comision);
    case 3:
      tarifaBase = balearicDelivery ? 67 : 46;
      return ((tarifaBase * (1 + iva)) + comision);
    case 4:
      tarifaBase = balearicDelivery ? 77 : 52;
      return ((tarifaBase * (1 + iva)) + comision);
    case 5:
      tarifaBase = balearicDelivery ? 85 : 64;
      return ((tarifaBase * (1 + iva)) + comision);
    case 6:
      tarifaBase = 72;
      return ((tarifaBase * (1 + iva)) + comision);
    case 7:
      tarifaBase = 80;
      return ((tarifaBase * (1 + iva)) + comision);
    case 8:
      tarifaBase = 89;
      return ((tarifaBase * (1 + iva)) + comision);
    case 9:
      tarifaBase = 95;
      return ((tarifaBase * (1 + iva)) + comision);
    case 10:
      tarifaBase = 106;
      return ((tarifaBase * (1 + iva)) + comision);
    case 11:
      tarifaBase = 115;
      return ((tarifaBase * (1 + iva)) + comision);


    default: return (50 + comision);
  }

};