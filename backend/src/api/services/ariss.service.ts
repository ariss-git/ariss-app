import { ArissUserType } from "@prisma/client";
import prisma from "../../lib/orm";
import { type syncUserType } from "../../types/ariss.type";

export const syncUserService = async (data: syncUserType) => {
  const existing = await prisma.ariss.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existing) throw new Error("User already exist");

  const ariss = await prisma.ariss.create({
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
    },
  });
  console.log(`${ariss.type} - New user added to database ${ariss.name}`);

  return ariss;
};

export const fetchAllArissUsersService = async (type: ArissUserType | null) => {
  if (type === null) {
    return await prisma.ariss.findMany();
  }

  return await prisma.ariss.findMany({
    where: {
      type: type,
    },
  });
};
