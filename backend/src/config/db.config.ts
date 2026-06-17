import prisma from "../lib/orm";

export const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL DB");
  } catch (error: any) {
    console.log("Failed to connect to PostgreSQL DB", error.message);
  }
};
