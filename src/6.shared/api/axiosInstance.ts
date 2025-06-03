import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://77.238.235.94:15000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);
