import axios from 'axios';
import { apiUrl } from './apiUrl';

export const fetchAllCategoriesAPI = async () => {
  return await axios.get(`${apiUrl}/stock/category/all`);
};
