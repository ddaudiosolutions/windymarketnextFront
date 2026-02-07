import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Producto from '../productos/Producto';
import { cargarProductoIdApi } from '@/helpers/utils';

export const ProductoMasVistos = ({ productosMasvistos }) => {
  const dispatch = useDispatch();
  const [mostViewed, setMostViewed] = useState([]);
  // Convertir el array de ID's a string para usarlo como dependencia efectiva en useEffect
  const productosIdsString = productosMasvistos.join(',');
  useEffect(() => {
    const fetchProductosMasVistos = async () => {
      if (productosMasvistos && productosMasvistos.length > 0) {
        const resultados = []; // Almacena los resultados de cada llamada

        for (const productoId of productosMasvistos) {
          try {
            // Llama a la acción de Redux para obtener la información del producto por su ID de manera secuencial.
            const resultado = await cargarProductoIdApi(dispatch, productoId).unwrap();
            resultados.push(resultado.data);
          } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la operación para un ID específico.
            console.error(`Error al obtener el producto ${productoId}:`, error);
          }
        }

        // Una vez completadas todas las llamadas, actualiza el estado con los resultados.
        setMostViewed(resultados);
      }
    };

    fetchProductosMasVistos();
  }, [productosIdsString, dispatch]);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 md:gap-4 px-4 md:px-6 max-w-7xl w-full'>
      {mostViewed.map(
        (producto, index) =>
          // si producto no es null
          producto && <Producto key={producto._id} producto={producto} busqueda={index} />,
      )}
    </div>
  );
};
