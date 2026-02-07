import { Field, Form } from 'react-final-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchByWords = ({ setSearchWords }) => {
  const onSubmit = async (values) => {
    const searchWords = values.search;
    setSearchWords({ searchWord: searchWords });
  };

  return (
    <div className='flex justify-center items-center gap-2 md:gap-3'>
      <div className='flex-1 max-w-3xl'>
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
                    className='text-sm md:text-base h-10 md:h-11'
                  />
                )}
              </Field>
              </div>
            </form>
          )}
        />
      </div>
      <div className='flex-shrink-0'>
        <Button type='submit' form='searchForm' variant='success' className='text-xs md:text-sm px-4 md:px-6 h-10 md:h-11'>
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchByWords;
