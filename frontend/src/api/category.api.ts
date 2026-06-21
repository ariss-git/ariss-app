import axios from "axios";
import { apiUrl } from "./apiUrl";

export const fetchAllCategoryAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/stock/category/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
