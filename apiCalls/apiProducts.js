export const fetchProducts = ({ busquedapage }) => {
  /*  console.log('busquedapage', busquedapage) */
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  console.log('Backend URL:', backendUrl);
  const { busquedaquery, pagequery } = busquedapage;
  return fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + `productos?busqueda=${busquedaquery}&page=${pagequery}`, {
    next: {
      revalidate: 60
    }
  }
  ).then((res) => res.json());
};

export const fetchProductId = (productId) => {
  // Aceptar directamente el ID del producto
  const idProducto = typeof productId === 'string' ? productId : productId.producto;
  return fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + `productos/${idProducto}`, {
    cache: 'no-store' // Siempre obtener datos frescos, sin caché
  }
  ).then((res) => res.json());
};