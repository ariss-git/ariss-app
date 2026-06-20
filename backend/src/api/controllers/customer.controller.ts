import { Request, Response } from "express";
import * as customerServices from "../services/customer.service";
import { getAuth } from "@clerk/express";
import { CustomerType } from "@prisma/client";

export const registerCustomerController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id, name, email, profilePicUrl } = req.body;

    const data = { id, name, email, profilePicUrl };
    if (!data) {
      errorMessage = "Required fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const customer = await customerServices.registerCustomerService(data);
    res.status(201).json({
      messsage: "New customer synced to database",
      customer,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllCustomerController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const typeParam = req.query.type;

    if (
      typeParam &&
      !Object.values(CustomerType).includes(typeParam as CustomerType)
    ) {
      return res.status(400).json({
        error: "Invalid user type",
      });
    }

    const customers = await customerServices.fetchAllCustomerService(
      (typeParam as CustomerType) ?? null,
    );
    res.status(200).json({ total: customers.length, customers });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const fetchSingleCustomerController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id } = req.params;

    const customer = await customerServices.fetchSingleCustomerService(
      id as string,
    );
    res.status(200).json({ customer });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const completeDealerProfileController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id } = req.params;

    const {
      phone,
      gstin,
      businessName,
      businessPicUrl,
      shippingAddress,
      billingAddress,
    } = req.body;

    const data = {
      phone,
      gstin,
      businessName,
      businessPicUrl,
      shippingAddress,
      billingAddress,
    };
    if (!data) {
      errorMessage = "Required fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const dealer = await customerServices.completeDealerProfileService(
      id as string,
      data,
    );
    res.status(200).json({
      messsage: `Dealer - ${dealer.businessName} has completed their profile`,
      dealer,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const completeEmployeeProfileController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id } = req.params;

    const { phone, type, dealerId } = req.body;

    const data = {
      phone,
      type,
      dealerId,
    };
    if (!data) {
      errorMessage = "Required fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const employee = await customerServices.completeEmployeeProfileService(
      id as string,
      data,
    );
    res.status(200).json({
      messsage: `An employee has completed their profile`,
      employee,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const approveCustomerController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id } = req.params;

    const customer = await customerServices.approveCustomerService(
      id as string,
    );
    res.status(200).json({ message: "Customer account approved", customer });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const disapproveCustomerController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id } = req.params;

    const customer = await customerServices.disapproveCustomerService(
      id as string,
    );
    res.status(200).json({ message: "Customer account disapproved", customer });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCustomerController = async (req: Request, res: Response) => {
  let errorMessage;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { id } = req.params;

    const customer = await customerServices.deleteCustomerService(id as string);
    res.status(204).json({ message: "Customer account deleted", customer });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
