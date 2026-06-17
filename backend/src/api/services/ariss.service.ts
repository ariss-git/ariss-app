import prisma from "../../lib/orm";
import { type syncUserType } from "../../types/ariss.type";

export const syncUserService = async (data: syncUserType) => {
  const existing = await prisma.ariss.findUnique({
    where: {
      id: data.id,
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
