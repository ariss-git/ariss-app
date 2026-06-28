import axios from "axios";
import { apiUrl } from "./apiUrl";

export const fetchAllProductsAPI = async () => {
  return await axios.get(`${apiUrl}/stock/product/all`);
};

export const addProductAPI = async (data: any, token: string) => {
  return await axios.post(`${apiUrl}/stock/product/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

