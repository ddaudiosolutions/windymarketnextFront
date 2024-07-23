import { obtenerProductosAuthor } from '../slices/productSlice';
import { obtenerBuscoPostsUserAction } from '../slices/buscoPostSlice';
import Swal from 'sweetalert2';

export const cargarProductosAuthor = (dispatch, history, post) => {
  const idAuthor = post.author._id;
  dispatch(obtenerProductosAuthor(idAuthor));
  dispatch(obtenerBuscoPostsUserAction(idAuthor));
  history.push(`/productos/auth/${idAuthor}`);
};

export const extraerIdDeURL = (url) => {
  const ultimaBarraIndex = url.lastIndexOf('/');
  const id = url.substring(ultimaBarraIndex + 1);
  return id;
};

export const verificarPesoImagenes = (images) => {
  let isPesado = false;
  for (const image of images) {
    if (image.size > 1000000) {
      isPesado = true;
      break;
    }
  }
  return isPesado;
};

export const swalFirePesoImagenes =  (producto) => {
  return Swal.fire({
    icon: 'info',
    html: 'Peso mayor de 1Mb! Se reducirá el peso de la imagen, puede perder algo de calidad!!',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Guardar y Continuar',
    reverseButtons: true,
  });
};

export const swalFireFaltaTelefono = ( ) => {  
   return Swal.fire({
      icon: 'info',
      html: 'No podrás recibir mensajes por Whatsapp <br> añade el telefono a tu perfil',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Guardar y Continuar',
      reverseButtons: true,
    });
};

export const swalPesoKgsAlert = () => {
  return Swal.fire({
    icon: 'info',
    html: 'Debes introducir el peso en Kgs del paquete para darte un precio estimado',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Cerrar',
    reverseButtons: true,
  });
};

