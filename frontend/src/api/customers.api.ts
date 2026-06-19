import type { CustomerType } from "@/types/customer.type";
import axios from "axios";
import { apiUrl } from "./apiUrl";

export const fetchAllCustomersAPI = async (
  type: CustomerType,
  token: string,
) => {
  if (type === null) {
    return axios.get(`${apiUrl}/customers/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return axios.get(`${apiUrl}/customers/all`, {
    params: {
      type,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleCustomerAPI = async (id: string, token: string) => {
  return axios.get(`${apiUrl}/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
