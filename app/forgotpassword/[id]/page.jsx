import ResetPassword from '@/components/usuarios/ResetPassword';

export default function ResetPasswordPage({ params }) {
  return <ResetPassword resetId={params.id} />;
}
