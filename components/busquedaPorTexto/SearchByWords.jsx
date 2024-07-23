import { Field, Form } from 'react-final-form';

const SearchByWords = ({ setSearchWords }) => {
  const onSubmit = async (values) => {
    const searchWords = values.search;
    setSearchWords({ searchWord: searchWords });
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-9  mt-4'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form id='searchForm' onSubmit={handleSubmit}>
              <div>
                <Field
                  className='form-control'
                  name='search'
                  component='input'
                  type='text'
                  placeholder='Escribe tu búsqueda aquí'
                />
              </div>
            </form>
          )}
        />
      </div>
      <div className='col-1 '>
        <button type='submit' form='searchForm' className='btn btn-success mt-4'>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchByWords;
