import axios from "axios";

import type { syncUserType } from "@/types/ariss.type";
import { apiUrl } from "./apiUrl";

export const syncClerkUserAPI = async (data: syncUserType, token: string) => {
  return await axios.post(`${apiUrl}/ariss/user/sync`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchAllArissUsersAPI = async (
  type: "SUPER" | "ADMIN" | "MODERATOR" | null,
  token: string,
) => {
  if (type === null) {
    return axios.get(`${apiUrl}/ariss/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return axios.get(`${apiUrl}/ariss/users`, {
    params: {
      type,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteArissUserAPI = async (id: string, token: string) => {
  return await axios.delete(`${apiUrl}/ariss/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const approveArissUserAPI = async (
  id: string,
  type: string,
  token: string,
) => {
  return await axios.patch(
    `${apiUrl}/ariss/user/approve/${id}`,
    { type },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const disapproveArissUserAPI = async (id: string, token: string) => {
  return await axios.patch(`${apiUrl}/ariss/user/disapprove/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
