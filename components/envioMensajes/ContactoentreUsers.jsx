import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailToUser } from '../../reduxLib/slices/usersSlice';
/* import '../Productos/Producto.css'; */
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
      }),
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
            <label>Manda un e-mail pidiendo más información:</label>
            <Field className='form-control' name='message' component='textarea' maxLength={100} />
          </div>
          <div>
            <label>Tu correo electrónico:</label>
            <Field
              className='form-control'
              name='senderEmail'
              component='input'
              type='email'
              placeholder='Correo electrónico'
            />
          </div>
          <button className='btn btn-outline-success mt-2' type='submit' onClick={trackSendMail}>
            Enviar mensaje
          </button>
        </form>
      )}
    />
  );
};

export default ContactoentreUsers;
