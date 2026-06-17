import { ArissUserType } from "@prisma/client";

export type syncUserType = {
  id: string;
  name: string;
  email: string;
  profilePicUrl: string | null;
  type: ArissUserType;
};
