export const fetchProducts = ({ busquedapage }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const { busquedaquery, pagequery } = busquedapage;
  return fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + `productos?busqueda=${busquedaquery}&page=${pagequery}`, {
    next: {
      revalidate: 60
    }
  }
  ).then((res) => res.json());
};

export const fetchProductId = (id) => {
  const idProducto = id.producto;
  return fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + `productos/${idProducto}`, {
    next: {
      revalidate: 60
    }
  }
  ).then((res) => res.json());
};