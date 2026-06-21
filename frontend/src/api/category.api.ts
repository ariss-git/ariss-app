import axios from "axios";
import { apiUrl } from "./apiUrl";
import type { AddCategory } from "@/types/stock.type";

export const fetchAllCategoryAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/stock/category/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addCategoryAPI = async (data: AddCategory, token: string) => {
  return await axios.post(`${apiUrl}/stock/category/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
