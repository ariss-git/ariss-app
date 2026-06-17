import { Request, Response } from "express";
import * as customerServices from "../services/customer.service";

export const registerDealerController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    const {
      id,
      name,
      phone,
      email,
      profilePicUrl,
      gstin,
      businessName,
      businessPicUrl,
      shippingAddress,
      billingAddress,
    } = req.body;

    const data = {
      id,
      name,
      phone,
      email,
      profilePicUrl,
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

    const dealer = await customerServices.registerDealerService(data);
    res
      .status(201)
      .json({
        messsage: `Dealer - ${dealer.businessName} has completed their profile`,
        dealer,
      });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
