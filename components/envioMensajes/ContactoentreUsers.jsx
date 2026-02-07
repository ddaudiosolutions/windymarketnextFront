import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailToUser } from '../../reduxLib/slices/usersSlice';
import '../productos/Producto.css';
import { trackSendMail } from '../../helpers/analyticsCalls';

const ContactoentreUsers = ({ productId, sellerEmail, sellerName }) => {
  const userSender = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const { senderEmail, message } = values;

    dispatch(
      sendMailToUser({
        productId,
        sellerEmail,
        sellerName,
        senderEmail,
        message,
        senderUserName: userSender.nombre,
      })
    );
  };

  const validate = (values) => {
    const errors = {};
    // Aquí puedes agregar validaciones personalizadas si es necesario
    if (!values.message) {
      errors.message = 'El mensaje es requerido';
    }
    if (!values.senderEmail) {
      errors.senderEmail = 'El correo electrónico es requerido';
    }
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label className='block text-xs md:text-sm font-medium mb-1'>
              Manda un e-mail pidiendo más información:
            </label>
            <Field
              className='flex w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
              name='message'
              component='textarea'
              maxLength={100}
            />
          </div>
          <div className='mt-2 md:mt-3'>
            <label className='block text-xs md:text-sm font-medium mb-1'>Tu correo electrónico:</label>
            <Field
              className='flex w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
              name='senderEmail'
              component='input'
              type='email'
              placeholder='Correo electrónico'
            />
          </div>
          <button
            className='mt-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition-colors'
            type='submit'
            onClick={trackSendMail}
          >
            Enviar mensaje
          </button>
        </form>
      )}
    />
  );
};

export default ContactoentreUsers;
