import { obtenerProductosAuthor } from '../reduxLib/slices/productSlices';
/* import { obtenerBuscoPostsUserAction } from '../reduxLib/slices/buscoPostSlice'; */
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const cargarProductosAuthor = (dispatch, idAuthor) => {
  console.log('idAuthor', idAuthor);
  dispatch(obtenerProductosAuthor(idAuthor));
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

export const swalFirePesoImagenes = (producto) => {
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

export const swalFireFaltaTelefono = () => {
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
    html: `Recuerda que los valores tienen que estar en metros para dar un precio estimado real. 
    Si los valores son correctos, ponte en contacto con nosotros, pues tu paquete es muy grande y lo gestionaremos personalmente`,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Cerrar',
    reverseButtons: true,
  });
};



export const setToken = (token) => {
  const secure = process.env.NODE_ENV !== 'development';
  const decodedToken = jwtDecode(token);
  const { userName, userId } = decodedToken;

  Cookies.set('userToken', token, { expires: 1, secure });
  Cookies.set('userName', userName, { expires: 1, secure });
  Cookies.set('userId', userId, { expires: 1, secure });
};

export const getToken = () => {
  return Cookies.get('userToken');
};

export const getUserName = () => {
  return Cookies.get('userName');
};

export const getUserId = () => {
  return Cookies.get('userId');
};

export const removeToken = () => {
  Cookies.remove('userToken');
  Cookies.remove('userName');
  Cookies.remove('userId');
};


// utils/cloudinary.js
export const getOptimizedImageUrl = (url) => {
  return `${url.replace('/upload/', '/upload/q_auto,f_auto,c_limit,w_800/')}`;
};