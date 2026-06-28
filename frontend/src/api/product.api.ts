import axios from "axios";
import { apiUrl } from "./apiUrl";

export const fetchAllProductsAPI = async () => {
  return await axios.get(`${apiUrl}/stock/product/all`);
};
