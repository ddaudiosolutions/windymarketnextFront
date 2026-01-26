import apiClient from '@/lib/apiClient';

const checkAuth = (data) => {
  return apiClient.post(`auth/`, data);
};

const resetPassword = (email) => {
  return apiClient.post('auth/resetPassword', email);
};

const changePasswordUser = (data) => {
  return apiClient.post('auth/changePasswordUser', data);
};

const AuthServices = {
  checkAuth,
  resetPassword,
  changePasswordUser,
};

export default AuthServices;
