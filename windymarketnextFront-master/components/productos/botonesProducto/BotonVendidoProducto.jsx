import { BsCoin } from 'react-icons/bs';

const BotonVendidoProducto = (props) => {
  return (
    <BsCoin
      className='ms-3'
      style={{ color: props.vendido && '38D9DF', fontSize: '2.5rem' }}
      onClick={() => {
        props.setVendido(!props.vendido);
        props.handleVendido();
      }}
    />
  );
};

export default BotonVendidoProducto;
