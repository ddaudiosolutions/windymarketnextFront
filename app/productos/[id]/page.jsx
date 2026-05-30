// app/productos/[id]/page.jsx
import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';
import { getOptimizedImageUrl } from '@/helpers/utils';

// Generar metadatos para SEO y Open Graph (WhatsApp, redes sociales)
export async function generateMetadata({ params }) {
  try {
    const productoId = await fetchProductId(params.id);

    if (!productoId) {
      return {
        title: 'Producto no encontrado',
        description: 'El producto que buscas no está disponible',
      };
    }

    const { title, description, images } = productoId;
    const pageUrl = `https://windymarket.es/productos/${params.id}`;

    // Validar que existan imágenes antes de intentar acceder
    if (!images || images.length === 0) {
      return {
        title: title || 'Producto',
        description: description || 'Producto disponible',
        openGraph: {
          type: 'website',
          url: pageUrl,
          title: title || 'Producto',
          description: description || 'Producto disponible',
        },
      };
    }

    const optimizedImageUrl = getOptimizedImageUrl(images[0].url);

    return {
      title: title,
      description: description,
      openGraph: {
        type: 'website',
        url: pageUrl,
        title: title,
        description: description,
        images: [
          {
            url: optimizedImageUrl,
            width: 800,
            height: 600,
            alt: title,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generando metadata:', error);
    return {
      title: 'Producto',
      description: 'Cargando información del producto',
    };
  }
}

// Definir la página del producto
const ProductoIdPage = async ({ params }) => {
  const productoId = await fetchProductId(params.id);
  return (
    <div className=''>
      <VerProducto producto={productoId} />
    </div>
  );
};

export default ProductoIdPage;
