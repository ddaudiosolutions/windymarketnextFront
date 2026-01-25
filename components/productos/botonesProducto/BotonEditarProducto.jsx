'use client';

import { BsJournal } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setProductToEdit } from '@/reduxLib/slices/productSlices';
import { useRouter } from 'next/navigation';

const BotonEditarProducto = ({ producto }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sendtoEdicion = (producto) => {
    dispatch(setProductToEdit(producto));
    router.push(`/productos/user/editar/${producto._id}`);
  };
  return (
    <BsJournal
      className='ms-3'
      style={{ /* color: 'red', */ fontSize: '2.5rem' }}
      onClick={() => {
        sendtoEdicion(producto);
      }}
    />
  );
};

export default BotonEditarProducto;
