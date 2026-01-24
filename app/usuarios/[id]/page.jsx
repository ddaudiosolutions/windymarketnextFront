import Usuario from '@/components/usuarios/Usuario';

export default function UsuarioPage({ params }) {
  return <Usuario userId={params.id} />;
}
