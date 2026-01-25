import EditarProducto from '@/components/productos/EditarProducto';

export default function EditarProductoPage({ params }) {
  return <EditarProducto productId={params.id} />;
}
