import axiosInstance, { setAuthToken } from './axiosInstance.js';

export const registerUser = async (credentials) => {
  const { data } = await axiosInstance.post('api/users/register', credentials);
  setAuthToken(data.token); 
  return data; 
};

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post('api/users/login', credentials);
  setAuthToken(data.token);
  return data; 
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post('api/users/logout');
  return data;
};

export const refreshUser = async () => {
  const { data } = await axiosInstance.get('api/users/current');
  return data;
};