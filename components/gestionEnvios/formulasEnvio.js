
export const calculoPesoVolumetrico = (alto, ancho, largo) => {
  if (alto && ancho && largo) {
    if(Math.max(alto, ancho, largo) <= 1.20) {
      return -1;
    } else {
      return alto * ancho * largo;
    }
  } else {
    return 0; 
  }
};

const categoriaEnvioPensinsular = (pesoVolumetrico) =>{    
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

const categoriaEnvioBaleares = (pesoVolumetrico) =>{
  if (pesoVolumetrico <= -1 ) return -1;
  if (pesoVolumetrico <= 0.12) return 0;
  if (pesoVolumetrico > 0.12 && pesoVolumetrico <= 0.17) return 1;
  if (pesoVolumetrico > 0.17 && pesoVolumetrico <= 0.24) return 2;
  if (pesoVolumetrico > 0.24 && pesoVolumetrico <= 0.28) return 3;
  if (pesoVolumetrico > 0.28 && pesoVolumetrico <= 0.33) return 4;
  if (pesoVolumetrico > 0.33 && pesoVolumetrico <= 0.38) return 5;
};

const categoriaPorPesoKgs = (pesoKgs) => {
  if (pesoKgs <= 1 ) return 'k1';
  if (pesoKgs <= 2 ) return 'k2';
  if (pesoKgs <= 3 ) return 'k3';
  if (pesoKgs <= 4 ) return 'k4';
  if (pesoKgs <= 5 ) return 'k5';
  if (pesoKgs <= 6 ) return 'k6';
  if (pesoKgs <= 7 ) return 'k7';
  if (pesoKgs <= 8 ) return 'k8';
  if (pesoKgs <= 9 ) return 'k9';
  if (pesoKgs <= 10 ) return 'k10';
  if (pesoKgs <= 15 ) return 'k15';
};

export const calculoPrecioEnvio = (pesoVolumetrico, balearicDelivery, pesoKgs) => {
  const comision = 4;
  const categoria = balearicDelivery === true && pesoKgs <= 0 ? 
    categoriaEnvioBaleares(pesoVolumetrico) : pesoKgs > 0 ? 
    categoriaPorPesoKgs(pesoKgs) : categoriaEnvioPensinsular(pesoVolumetrico);
  let tarifaBase;
  const iva = 0.21;
  switch (categoria){
    case -1:
      tarifaBase = balearicDelivery ? 39 : 24;
      return ( -1 );
    case 0:
      tarifaBase = balearicDelivery ? 39 : 24;
      return ( (tarifaBase * (1 + iva)) + comision);
    case 1:
      tarifaBase = balearicDelivery ? 46 : 30;
      return ( (tarifaBase * (1 + iva)) + comision);
    case 2:
      tarifaBase = balearicDelivery ? 58 : 38 ;
      return ( (tarifaBase * (1 + iva)) + comision);
    case 3:
      tarifaBase = balearicDelivery ? 67 : 46;
      return ( (tarifaBase * (1 + iva)) + comision);
    case 4:
      tarifaBase = balearicDelivery ? 77 : 52;
      return ( (tarifaBase * (1 + iva)) + comision);
    case 5:
      tarifaBase = balearicDelivery ? 85 : 64;
      return ( (tarifaBase * (1 + iva)) + comision);
    case 6:
      tarifaBase = 72;
      return ( (tarifaBase * (1 + iva)) + comision); 
    case 7:
      tarifaBase = 80;
      return ( (tarifaBase * (1 + iva)) + comision); 
    case 8:
      tarifaBase = 89;
      return ( (tarifaBase * (1 + iva)) + comision); 
    case 9:
      tarifaBase = 95;
      return ( (tarifaBase * (1 + iva)) + comision); 
    case 10:
      tarifaBase = 106;
      return ( (tarifaBase * (1 + iva)) + comision); 
    case 11:
      tarifaBase = 115;
      return ( (tarifaBase * (1 + iva)) + comision); 
    case 'k1':
      return (10.51 + comision);
    case 'k2':
      return (11.08 + comision);
    case 'k3':
      return (11.64 + comision);
    case 'k4':
      return (12.22 + comision);
    case 'k5':
      return (12.79 + comision);
    case 'k6':
      return (13.35 + comision);
    case 'k7':
      return (13.93 + comision);
    case 'k8':
      return (14.49 + comision);
    case 'k9':
      return (15.07 + comision);
    case 'k10':
      return (15.64 + comision);
    case 'k15':
      return (19.58 + comision);

    default: return ( 50 + comision);    
    }
       
};