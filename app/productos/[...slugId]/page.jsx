import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';
import { getOptimizedImageUrl } from '@/helpers/utils';

export async function generateMetadata({ params }) {
  console.log('generated metadata', params);
  const slugId = params.slugId[0];
  const parts = slugId.split('-');
  const productIdParams = parts[parts.length - 1];
  const productoId = await fetchProductId({ producto: productIdParams });
  if (!productoId) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto no está disponible',
    };
  }

  const { title, description, images } = productoId;
  const optimizedImageUrl = getOptimizedImageUrl(images[0].url);
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: optimizedImageUrl,
          alt: images[0].filename,
        },
      ],
    },
  };
}

// Definir la página del producto
const ProductoIdPage = ({ params }) => {
  const slugId = params.slugId[0];
  const parts = slugId.split('-');
  const productIdParams = parts[parts.length - 1];
  return (
    <div>
      <VerProducto productoIdParams={productIdParams} />
    </div>
  );
};

export default ProductoIdPage;
