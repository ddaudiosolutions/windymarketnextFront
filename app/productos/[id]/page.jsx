// app/productos/[id]/page.jsx
import { fetchProductId } from '@/apiCalls/apiProducts';
import VerProducto from '@/components/productos/VerProducto';
import fs from 'fs';
import path from 'path';

// Definir la página del producto
const ProductoIdPage = async ({ params }) => {
  const productoId = await fetchProductId({ producto: params.id });
  return (
    <div className=''>
      <VerProducto producto={productoId} />
    </div>
  );
};

export default ProductoIdPage;
