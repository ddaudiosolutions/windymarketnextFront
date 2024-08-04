import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';

export async function generateMetadata({ params }) {
  const productUrl = `https://windymarketnextfront.vercel.app/productos/${params.id}`; // Cambia esto por la URL real de tu página
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
      url: productUrl,
      images: [
        {
          url: images[0].url,
          alt: title,
        },
      ],
      logo: {
        url: '/LOGO_CIRCULAR_FONDO_BLANCO.png', // Cambia esto por la URL real de tu logo
        alt: 'Logo',
      },
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
