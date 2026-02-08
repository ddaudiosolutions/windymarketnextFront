import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Producto from '../productos/Producto';
import { obtenerProductoIdApi } from '@/reduxLib/slices/productSlices';

export const ProductoMasVistos = ({ productosMasvistos }) => {
  const dispatch = useDispatch();
  const [mostViewed, setMostViewed] = useState([]);
  // Convertir el array de ID's a string para usarlo como dependencia efectiva en useEffect
  const productosIdsString = productosMasvistos.join(',');

  // Determinar el grid según la cantidad de productos
  const gridCols = mostViewed.length === 1
    ? 'grid-cols-1 max-w-sm place-items-center'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 max-w-7xl';
  useEffect(() => {
    const fetchProductosMasVistos = async () => {
      if (productosMasvistos && productosMasvistos.length > 0) {
        const resultados = []; // Almacena los resultados de cada llamada

        for (const productoId of productosMasvistos) {
          try {
            // Llama a la acción de Redux para obtener la información del producto por su ID de manera secuencial.
            const resultado = await dispatch(obtenerProductoIdApi(productoId)).unwrap();
            resultados.push(resultado.data);
          } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la operación para un ID específico.
            console.error(`⚠️ Error al obtener el producto ${productoId}:`, error);
          }
        }

        // Una vez completadas todas las llamadas, actualiza el estado con los resultados.
        setMostViewed(resultados);
      }
    };

    fetchProductosMasVistos();
  }, [productosIdsString, dispatch]);

  return (
    <div className={`grid ${gridCols} gap-3 md:gap-4 px-4 md:px-6 w-full mx-auto`}>
      {mostViewed.map(
        (producto, index) =>
          // si producto no es null
          producto && <Producto key={producto._id} producto={producto} busqueda={index} />,
      )}
    </div>
  );
};
