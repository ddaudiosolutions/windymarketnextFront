import clienteAxios from '../../config/axios';

const checkAuth = (data) => {
  return clienteAxios.post(`auth/`, data);
};

const resetPassword = (email) => {
  return clienteAxios.post('auth/resetPassword', email);
};

const changePasswordUser = (data) => {
  return clienteAxios.post('auth/changePasswordUser', data);
};

const AuthServices = {
  checkAuth,
  resetPassword,
  changePasswordUser,
};

export default AuthServices;
