
'use client';
import FormularioDatosEnvio from "@/components/gestionEnvios/FormularioDatosEnvio";
import GestionEnvioModal from "@/components/modals/GestionEnvioModal";
import { useState } from "react";

export default function HandleDelivery ()  {
    // CREAR FORMULARIO PARA GESTION DE DATOS DE ENVIO
      const [showForm, setShowForm] = useState(true);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <GestionEnvioModal
        show={showForm}
        handleClose={() => setShowForm(false)}
        datosRemitente={null}
      />
      <h1 className='text-4xl font-bold mb-4'>Gestión de Envíos</h1>
      <p className='text-lg text-gray-600 mb-8'>Aquí podrás gestionar tus envíos de productos.</p>
      {/* Aquí puedes agregar componentes o funcionalidades para manejar los envíos */}
    </div>
  );
}