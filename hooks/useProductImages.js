import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

/**
 * Custom hook para manejar la lógica de imágenes de productos
 * @param {Object} config - Configuración del hook
 * @param {Array} config.existingImages - Array de imágenes existentes (modo edit)
 * @param {number} config.maxImages - Número máximo de imágenes permitidas
 * @param {string} config.mode - Modo de operación: 'create' o 'edit'
 * @returns {Object} Estado y funciones para manejar imágenes
 */
const useProductImages = ({ existingImages = [], maxImages = 8, mode = 'create' }) => {
  // Estado para imágenes nuevas a subir
  const [imagesToUpload, setImagesToUpload] = useState([]);

  // Estado para imágenes marcadas para borrar (solo en modo edit)
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // Cálculo de imágenes totales resultantes
  const totalImages = useMemo(() => {
    const existing = existingImages.length;
    const toUpload = imagesToUpload.length;
    const toDelete = imagesToDelete.length;

    if (mode === 'edit') {
      return existing + toUpload - toDelete;
    }
    return toUpload;
  }, [existingImages.length, imagesToUpload.length, imagesToDelete.length, mode]);

  // Validaciones
  const errors = useMemo(() => {
    const errs = {};

    // Validar máximo de imágenes
    if (totalImages > maxImages) {
      errs.maxImages = `Máximo ${maxImages} imágenes permitidas`;
    }

    // Validar mínimo 1 imagen en create
    if (mode === 'create' && imagesToUpload.length === 0) {
      errs.minImages = 'Debes subir al menos una imagen';
    }

    // Validar que no se borren todas las imágenes en edit
    if (mode === 'edit') {
      const remainingExisting = existingImages.length - imagesToDelete.length;
      if (remainingExisting === 0 && imagesToUpload.length === 0) {
        errs.noImages = 'No puedes borrar todas las imágenes, deja al menos una, o carga una imagen nueva';
      }
    }

    return errs;
  }, [totalImages, maxImages, mode, imagesToUpload.length, existingImages.length, imagesToDelete.length]);

  // Estado de validación
  const isValid = Object.keys(errors).length === 0;

  // Handler para cambio de archivos en input file
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImagesToUpload(files);
    }
  };

  // Handler para marcar/desmarcar imagen para borrar (modo edit)
  const handleToggleDelete = (filename, shouldDelete) => {
    if (shouldDelete) {
      // Agregar a la lista de imágenes a borrar
      setImagesToDelete((prev) => {
        if (!prev.includes(filename)) {
          return [...prev, filename];
        }
        return prev;
      });
    } else {
      // Quitar de la lista de imágenes a borrar
      setImagesToDelete((prev) => prev.filter((img) => img !== filename));
    }
  };

  // Función para resetear el estado del hook
  const reset = () => {
    setImagesToUpload([]);
    setImagesToDelete([]);
  };

  // Efecto para mostrar alertas cuando se intenta borrar todas las imágenes
  useEffect(() => {
    if (mode === 'edit' && errors.noImages) {
      Swal.fire({
        icon: 'error',
        text: errors.noImages,
      });
    }
  }, [mode, errors.noImages]);

  return {
    // Estados
    imagesToUpload,
    imagesToDelete,
    totalImages,
    errors,
    isValid,

    // Handlers
    handleFileChange,
    handleToggleDelete,

    // Funciones
    reset,

    // Setters directos (por si se necesitan)
    setImagesToUpload,
    setImagesToDelete,
  };
};

export default useProductImages;
