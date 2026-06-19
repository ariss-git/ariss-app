import { CustomerType } from "@prisma/client";

export type RegisterCustomerType = {
  id: string;
  name: string;
  email: string;
  profilePicUrl: string | null;
};

export type CompleteDealerProfileType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  profilePicUrl: string | null;
  gstin: string;
  businessName: string;
  businessPicUrl: string | null;
  shippingAddress: {
    pncd: string;
    loc: string;
    dst: string;
    stcd: string;
    adr: string;
  };
  billingAddress: {
    pncd: string;
    loc: string;
    dst: string;
    stcd: string;
    adr: string;
  };
};

export type CompleteEmployeeProfileType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: CustomerType;
  profilePicUrl: string | null;
  dealerId: string;
};
