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
                      <label className='block font-saira text-gray-700 text-xs md:text-sm mb-2'>
                        Introduce el mensaje de whatsapp que quieres enviar:
                      </label>
                      <Field
                        className='w-full rounded-md border border-gray-300 bg-white px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                        name='message'
                        component='textarea'
                        maxLength={100}
                      />
                    </div>
                    <button
                      className='mt-2 md:mt-3 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-saira w-full md:w-auto'
                      type='submit'
                    >
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
