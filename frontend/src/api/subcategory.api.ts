import axios from "axios";
import { apiUrl } from "./apiUrl";
import type { AddSubcategory, UpdateCategory } from "@/types/stock.type";

export const fetchAllSubcategoryAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/stock/subcategory/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleSubcategoryAPI = async (id: string, token: string) => {
  return await axios.get(`${apiUrl}/stock/subcategory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addSubcategoryAPI = async (
  data: AddSubcategory,
  token: string,
) => {
  return await axios.post(`${apiUrl}/stock/subcategory/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSubcategoryAPI = async (id: string, token: string) => {
  return await axios.delete(`${apiUrl}/stock/subcategory/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategoryAPI = async (
  id: string,
  data: UpdateCategory,
  token: string,
) => {
  return await axios.put(`${apiUrl}/stock/category/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
