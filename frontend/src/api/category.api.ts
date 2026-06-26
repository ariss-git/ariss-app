import axios from "axios";
import { apiUrl } from "./apiUrl";
import type { AddCategory, UpdateCategory } from "@/types/stock.type";

export const fetchAllCategoryAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/stock/category/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleCategoryAPI = async (id: string, token: string) => {
  return await axios.get(`${apiUrl}/stock/category/${id}`, {
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

export const deleteCategoryAPI = async (id: string, token: string) => {
  return await axios.delete(`${apiUrl}/stock/category/delete/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateCategoryAPI = async (id: string, data: UpdateCategory, token: string) => {
  return await axios.put(`${apiUrl}/stock/category/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
