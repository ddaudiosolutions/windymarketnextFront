import VerProducto from '@/components/productos/VerProducto';

export async function generateMetadata(producto) {
  if (!producto) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto no está disponible',
    };
  }
  const { title, description, images } = producto.searchParams;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: images[0].url,
          alt: title,
        },
      ],
    },
  };
}

// Definir la página del producto
const ProductoIdPage = () => {
  return (
    <div>
      <VerProducto />
    </div>
  );
};

export default ProductoIdPage;
