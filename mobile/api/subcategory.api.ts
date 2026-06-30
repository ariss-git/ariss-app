import axios from 'axios';
import { apiUrl } from './apiUrl';

export const fetchAllSubcategoriesByCategory = async (categoryId: string) => {
  return await axios.get(`${apiUrl}/stock/subcategory/category/${categoryId}`);
};
