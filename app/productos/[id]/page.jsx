import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';

export async function generateMetadata({ params }) {
  const productoId = await fetchProductId({ producto: params.id });
  if (!productoId) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto no está disponible',
    };
  }

  const { title, description, images } = productoId;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: images[0].url,
          alt: images[0].filename,
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
