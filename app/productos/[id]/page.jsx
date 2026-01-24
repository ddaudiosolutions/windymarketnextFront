// app/productos/[id]/page.jsx
import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';

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
