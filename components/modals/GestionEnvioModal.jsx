'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FormularioDatosEnvio from '../gestionEnvios/FormularioDatosEnvio';

function GestionEnvioModal({ show, handleClose, datosRemitente }) {
  return (
    <Dialog open={show} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl bg-white border border-gray-200 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            <h5 className="font-saira-stencil text-lg"> Formulario de contacto </h5>
            <h6 className="font-saira text-sm text-gray-600">Rellena todos los campos que estén vacíos</h6>
          </DialogTitle>
        </DialogHeader>
        <FormularioDatosEnvio handleClose={handleClose} datosRemitente={datosRemitente} />
      </DialogContent>
    </Dialog>
  );
}

export default GestionEnvioModal;
