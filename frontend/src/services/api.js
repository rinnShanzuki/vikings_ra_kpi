import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
});

api.interceptors.request.use(config => {
  const currentRole = localStorage.getItem('vikings-demo-role') || 'Manager';
  config.headers['x-demo-role'] = currentRole;
  return config;
});

export const formatErrorMessage = (error) => {
  return error?.response?.data?.error || error?.message || 'An unexpected error occurred';
};

export default api;
