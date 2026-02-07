'use client';

function BotonGestionEnvio({ setShowForm }) {
  return (
    <>
      <button
        className='px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'
        onClick={() => {
          setShowForm(true);
        }}
      >
        Gestionar Envíos
      </button>
    </>
  );
}

export default BotonGestionEnvio;
