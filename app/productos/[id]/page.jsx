// app/productos/[id]/page.jsx
import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';
import Head from 'next/head';

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
      images: images[0].url,
    },
  };
}

// Definir la página del producto
const ProductoIdPage = async ({ params }) => {
  const productoId = await fetchProductId({ producto: params.id });
  console.log(productoId);
  return (
    <div className=''>
      <Head>
        <title>{productoId.title}</title>
        <meta name='description' content={productoId.description} />
        <meta property='og:title' content={productoId.title} />
        <meta property='og:description' content={productoId.description} />
        <meta property='og:image' content={productoId.images[0].url} />
      </Head>
      <VerProducto producto={productoId} />
    </div>
  );
};

export default ProductoIdPage;
