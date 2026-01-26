import { Field, Form } from 'react-final-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchByWords = ({ setSearchWords }) => {
  const onSubmit = async (values) => {
    const searchWords = values.search;
    setSearchWords({ searchWord: searchWords });
  };

  return (
    <div className='flex justify-center gap-2'>
      <div className='flex-1 max-w-2xl mt-4'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form id='searchForm' onSubmit={handleSubmit}>
              <div>
                <Field name='search'>
                {({ input }) => (
                  <Input
                    {...input}
                    type='text'
                    placeholder='Escribe tu búsqueda aquí'
                  />
                )}
              </Field>
              </div>
            </form>
          )}
        />
      </div>
      <div className='mt-4'>
        <Button type='submit' form='searchForm' variant='success'>
          Buscar
        </Button>
      </div>
      </div>
  );
};

export default SearchByWords;
