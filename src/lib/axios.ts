import axios from 'axios';
import { store } from '@/app/store';

export const api = axios.create({
  baseURL: 'https://library-backend-production-b9cf.up.railway.app/api',
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
