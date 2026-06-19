import { CustomerType } from "@prisma/client";
import prisma from "../../lib/orm";
import {
  CompleteDealerProfileType,
  RegisterCustomerType,
} from "../../types/customer.type";

export const registerCustomerService = async (data: RegisterCustomerType) => {
  const existing = await prisma.customers.findUnique({
    where: {
      id: data.id,
    },
  });
  if (existing) throw new Error("Dealer already exist");

  const customer = await prisma.customers.create({
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      profilePicUrl: data.profilePicUrl,
    },
  });

  return customer;
};

export const fetchAllCustomerService = async (type: CustomerType) => {
  if (type === null) {
    return await prisma.customers.findMany();
  }

  return await prisma.customers.findMany({
    where: {
      type,
    },
  });
};

export const completeDealerProfileService = async (
  data: CompleteDealerProfileType,
) => {
  const existing = await prisma.customers.findUnique({
    where: {
      id: data.id,
    },
  });
  if (existing) throw new Error("Dealer already exist");

  const dealer = await prisma.customers.create({
    data: {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      gstin: data.gstin,
      profilePicUrl: data.profilePicUrl,
      businessPicUrl: data.businessPicUrl,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      type: CustomerType.DEALER,
    },
  });

  return dealer;
};
