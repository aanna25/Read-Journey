import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://readjourney.b.goit.study/',
});

export const setAuthToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

export default instance;