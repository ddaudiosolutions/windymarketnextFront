import _ from 'lodash';
import { Field, Form } from 'react-final-form';
import Swal from 'sweetalert2';

const SendMessage = ({ phoneNumber }) => {
  const onSubmit = (values) => {
    if (_.isEmpty(values.message)) {
      Swal.fire('Debes introducir un mensaje');
    } else {
      // Regex expression to remove all characters which are NOT alphanumeric
      const number = phoneNumber
        .toString()
        .replace(/[^\w\s]/gi, '')
        .replace(/ /g, '');
      // Appending the phone number to the URL
      let url = `https://web.whatsapp.com/send?phone=+34${number}`;
      // Appending the message to the URL by encoding it
      url += `&text=${encodeURI(values.message)}&app_absent=0`;
      // Open our newly created URL in a new tab to send the message
      window.open(url);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (values.textarea && values.textarea.length > 100) {
      errors.textarea = 'El texto excede el límite de 100 caracteres';
    }
    return errors;
  };

  return (
    <div className='communication'>
      <div className='whatsapp-card app'>
        <div className='message app' style={{ marginTop: '1.5em' }}>
          <Form onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {phoneNumber !== undefined && (
                  <>
                    <div>
                      <label>Introduce el mensaje de whatsapp que quieres enviar:</label>
                      <Field
                        className='form-control'
                        name='message'
                        component='textarea'
                        maxLength={100}
                      />
                    </div>
                    <button className='btn btn-outline-success mt-2' type='submit'>
                      Enviar WhatsApp
                    </button>
                  </>
                )}
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
