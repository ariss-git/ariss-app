import { CustomerType } from "@prisma/client";
import prisma from "../../lib/orm";
import {
  CompleteDealerProfileType,
  CompleteEmployeeProfileType,
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
    orderBy: {
      businessName: "asc",
    },
  });
};

export const fetchSingleCustomerService = async (id: string) => {
  return await prisma.customers.findMany({
    where: {
      id,
    },
  });
};

export const completeDealerProfileService = async (
  id: string,
  data: CompleteDealerProfileType,
) => {
  const dealer = await prisma.customers.update({
    where: {
      id,
    },
    data: {
      phone: data.phone,
      gstin: data.gstin,
      businessPicUrl: data.businessPicUrl,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      type: CustomerType.DEALER,
      profileCompleted: true,
    },
  });

  return dealer;
};

export const completeEmployeeProfileService = async (
  id: string,
  data: CompleteEmployeeProfileType,
) => {
  const employee = await prisma.customers.update({
    where: {
      id,
    },
    data: {
      phone: data.phone,
      type: data.type,
      dealerId: data.dealerId,
      profileCompleted: true,
    },
  });

  return employee;
};
