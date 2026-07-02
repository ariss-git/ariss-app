import axios from 'axios';
import { apiUrl } from './apiUrl';

export const fetchAllProductsBySubcategoryAPI = async (subcategoryId: string) => {
  return await axios.get(`${apiUrl}/stock/product/subcategory/${subcategoryId}`);
};
