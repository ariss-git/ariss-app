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
