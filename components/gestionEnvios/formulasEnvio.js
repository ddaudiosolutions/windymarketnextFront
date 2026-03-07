
// Sobrecoste por bulto con lado largo > 2.10m (antes de IVA)
export const SOBRECOSTE_LARGO_PENINSULA = 10;
export const SOBRECOSTE_LARGO_BALEARES = 20;

// Acepta tanto punto como coma como separador decimal (ej: "2,50" → 2.5)
const parseNum = (value) => parseFloat(String(value || 0).replace(',', '.')) || 0;

export const tieneSobrecoste = (largo) => parseNum(largo) > 2.10;

// Girth = largo + 2×ancho + 2×alto (en metros)
// Si girth ≤ 2.90m → bulto delgado tipo mástil/vela → servicio económico
export const calculoGirth = (largo, ancho, alto) => {
  if (!largo || !ancho || !alto) return 0;
  return parseNum(largo) + 2 * parseNum(ancho) + 2 * parseNum(alto);
};

// Retorna:
//  0  → sin medidas suficientes
// -1  → paquete pequeño (max dim ≤ 1.20m): usar precio por peso en kg
// -2  → bulto delgado tipo mástil/vela (girth ≤ 2.90m, max > 1.20m): servicio económico ~24€+IVA
// >0  → volumen en m³: usar tarifa volumétrica
export const calculoPesoVolumetrico = (alto, ancho, largo) => {
  const a = parseNum(alto);
  const w = parseNum(ancho);
  const l = parseNum(largo);
  if (!a || !w || !l) return 0;
  if (Math.max(a, w, l) <= 1.20) return -1;
  if (calculoGirth(l, w, a) <= 2.90) return -2;
  return parseFloat((a * w * l).toFixed(3));
};

const categoriaEnvioPeninsular = (vol) => {
  if (vol <= 0.12) return 0;
  if (vol <= 0.17) return 1;
  if (vol <= 0.24) return 2;
  if (vol <= 0.28) return 3;
  if (vol <= 0.33) return 4;
  if (vol <= 0.38) return 5;
  if (vol <= 0.43) return 6;
  if (vol <= 0.48) return 7;
  if (vol <= 0.53) return 8;
  if (vol <= 0.58) return 9;
  if (vol <= 0.63) return 10;
  if (vol <= 0.68) return 11;
  return 12; // > 0.68m³, precio a consultar
};

const categoriaEnvioBaleares = (vol) => {
  if (vol <= 0.12) return 0;
  if (vol <= 0.17) return 1;
  if (vol <= 0.24) return 2;
  if (vol <= 0.28) return 3;
  if (vol <= 0.33) return 4;
  if (vol <= 0.38) return 5;
  if (vol <= 0.43) return 6;
  if (vol <= 0.48) return 7;
  return 8; // > 0.48m³, precio a consultar
};

const categoriaPorPesoKgs = (pesoKgs) => {
  if (pesoKgs <= 1)  return 'k1';
  if (pesoKgs <= 2)  return 'k2';
  if (pesoKgs <= 3)  return 'k3';
  if (pesoKgs <= 4)  return 'k4';
  if (pesoKgs <= 5)  return 'k5';
  if (pesoKgs <= 6)  return 'k6';
  if (pesoKgs <= 7)  return 'k7';
  if (pesoKgs <= 8)  return 'k8';
  if (pesoKgs <= 9)  return 'k9';
  if (pesoKgs <= 10) return 'k10';
  if (pesoKgs <= 15) return 'k15';
  return 'k15+';
};

// Helper interno: tarifa base sin sobrecoste ni IVA
const getTarifaBase = (pesoVolumetrico, balearicDelivery) => {
  if (balearicDelivery === true) {
    switch (categoriaEnvioBaleares(pesoVolumetrico)) {
      case 0: return 39;
      case 1: return 46;
      case 2: return 58;
      case 3: return 67;
      case 4: return 77;
      case 5: return 86;
      case 6: return 95;
      case 7: return 103;
      default: return 120; // > 0.48m³, precio a consultar
    }
  } else {
    switch (categoriaEnvioPeninsular(pesoVolumetrico)) {
      case 0:  return 30;
      case 1:  return 36;
      case 2:  return 44;
      case 3:  return 52;
      case 4:  return 58;
      case 5:  return 70;
      case 6:  return 78;
      case 7:  return 86;
      case 8:  return 95;
      case 9:  return 101;
      case 10: return 112;
      case 11: return 121;
      default: return 140; // > 0.68m³, precio a consultar
    }
  }
};

// largo: aplica sobrecoste si largo > 2.10m
//        +10€ Península / +20€ Baleares (antes de IVA)
export const calculoPrecioEnvio = (pesoVolumetrico, balearicDelivery, pesoKgs, largo = 0) => {
  const comision = 4;
  const iva = 0.21;

  // Bulto delgado tipo mástil/vela (girth ≤ 2.90m, max dim > 1.20m)
  if (pesoVolumetrico === -2) {
    return parseFloat(((24 * (1 + iva)) + comision).toFixed(2));
  }

  // Paquete pequeño por peso (accesorios, max dim ≤ 1.20m)
  if (pesoVolumetrico <= -1) {
    switch (categoriaPorPesoKgs(pesoKgs || 0)) {
      case 'k1':  return 10.51 + comision;
      case 'k2':  return 11.08 + comision;
      case 'k3':  return 11.64 + comision;
      case 'k4':  return 12.22 + comision;
      case 'k5':  return 12.79 + comision;
      case 'k6':  return 13.35 + comision;
      case 'k7':  return 13.93 + comision;
      case 'k8':  return 14.49 + comision;
      case 'k9':  return 15.07 + comision;
      case 'k10': return 15.64 + comision;
      case 'k15': return 19.58 + comision;
      default:    return 25 + comision;
    }
  }

  // Precio volumétrico con sobrecoste si largo > 2.10m
  const tarifaBase = getTarifaBase(pesoVolumetrico, balearicDelivery);
  const sobrecoste = parseNum(largo) > 2.10
    ? (balearicDelivery ? SOBRECOSTE_LARGO_BALEARES : SOBRECOSTE_LARGO_PENINSULA)
    : 0;
  return parseFloat((((tarifaBase + sobrecoste) * (1 + iva)) + comision).toFixed(2));
};
