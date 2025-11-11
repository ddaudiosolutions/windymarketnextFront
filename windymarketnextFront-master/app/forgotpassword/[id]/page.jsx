import ResetPassword from '@/components/usuarios/ResetPassword';
import React from 'react';

const resetUserPasswordPage = (params) => {
  console.log('params', params);
  return <ResetPassword params={params.params} />;
};

export default resetUserPasswordPage;
