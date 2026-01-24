import ProductosAuth from '@/components/productos/ProductosAuth';

export default function ProductosAuthPage({ params }) {
  return <ProductosAuth userId={params.userId} />;
}
