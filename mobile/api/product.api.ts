import axios from 'axios';
import { apiUrl } from './apiUrl';

export const fetchAllProductsBySubcateogryAPI = async (subcategoryId: string) => {
  return await axios.get(`${apiUrl}/stock/product/subcategory/${subcategoryId}`);
};
