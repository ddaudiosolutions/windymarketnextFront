export const fetchProducts = ({ busquedapage }) => {
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
  const idProducto = productId.producto;
  return fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + `productos/${idProducto}`, {
    next: {
      revalidate: 60
    }
  }
  ).then((res) => res.json());
};