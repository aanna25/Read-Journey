import axiosInstance, { setAuthToken } from './axiosInstance.js';

export const registerUser = async (credentials) => {
  const { data } = await axiosInstance.post('/users/signup', credentials);
  setAuthToken(data.token); 
  return data; 
};

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post('/users/signin', credentials);
  setAuthToken(data.token);
  return data; 
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post('/users/signout');
  return data;
};

export const refreshUser = async () => {
  const { data } = await axiosInstance.get('/users/current');
  return data;
};