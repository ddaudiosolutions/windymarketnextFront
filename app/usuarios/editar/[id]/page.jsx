import EditarUser from '@/components/usuarios/EditarUser';

export default function EditarUsuarioPage({ params }) {
  return <EditarUser userId={params.id} />;
}