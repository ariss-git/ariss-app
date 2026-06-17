import { CustomerType } from "@prisma/client";
import prisma from "../../lib/orm";
import { RegisterDealerType } from "../../types/customer.type";

export const registerDealer = async (data: RegisterDealerType) => {
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
