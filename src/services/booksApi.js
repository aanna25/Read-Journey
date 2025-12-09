import axiosInstance from './axiosInstance.js';

export const fetchRecommendedBooks = async (params = {}) => {
  const { data } = await axiosInstance.get('api/books/recommended', { params });
  return data;
};

export const fetchMyLibrary = async () => {
  const { data } = await axiosInstance.get('api/books/own');
  return data;
};