'use client';

function BotonGestionEnvio({ setShowForm }) {
  return (
    <>
      <button
        className='btn btn-success'
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
