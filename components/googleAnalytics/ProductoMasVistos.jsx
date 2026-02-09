import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Producto from '../productos/Producto';
import { obtenerProductoIdApi } from '@/reduxLib/slices/productSlices';

export const ProductoMasVistos = ({ productosMasvistos }) => {
  const dispatch = useDispatch();
  const [mostViewed, setMostViewed] = useState([]);
  // Convertir el array de ID's a string para usarlo como dependencia efectiva en useEffect
  const productosIdsString = productosMasvistos.slice(0, 5).join(',');

  useEffect(() => {
    const fetchProductosMasVistos = async () => {
      if (productosMasvistos && productosMasvistos.length > 0) {
        const resultados = []; // Almacena los resultados de cada llamada
        // Limitar a los primeros 5 productos más vistos
        const productosLimitados = productosMasvistos.slice(0, 5);

        for (const productoId of productosLimitados) {
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
    <div className='product-grid-container flex justify-center mt-3 md:mt-4'>
      <div className='product-grid flex flex-wrap justify-center gap-3 md:gap-4 px-4 md:px-6 max-w-7xl w-full'>
        {mostViewed.map(
          (producto, index) =>
            // si producto no es null y no está vendido
            producto && producto.vendido !== true && <Producto key={producto._id} producto={producto} busqueda={index} />,
        )}
      </div>
    </div>
  );
};
