import { Request, Response } from "express";
import * as productServices from "../services/product.service";
import { getAuth } from "@clerk/express";

export const addProductController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    const {
      name,
      description,
      type,
      label,
      warranty,
      quantity,
      sku,
      usps,
      imageUrls,
      filePath,
      subcategoryId,
    } = req.body;

    const data = {
      name,
      description,
      type,
      label,
      warranty,
      quantity,
      sku,
      usps,
      imageUrls,
      filePath,
      subcategoryId,
    };
    if (!data) {
      errorMessage = "Required fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const product = await productServices.addProductService(data);
    return res.status(200).json({ product });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
