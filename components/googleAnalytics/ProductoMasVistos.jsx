import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Producto from '../productos/Producto';
import { obtenerProductoIdApi } from '../../reduxLib/slices/productSlices';

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
            const resultado = await dispatch(obtenerProductoIdApi(productoId)).unwrap();
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
    <div
      className='row row-cols-2 row-cols-xs-4 row-cols-sm-3 row-cols-md-3 
    row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 g-2 justify-content-center mx-4'
    >
      {mostViewed.map(
        (producto, index) =>
          // si producto no es null
          producto && <Producto key={producto._id} producto={producto} busqueda={index} />,
      )}
    </div>
  );
};
