import { Request, Response } from "express";
import * as subcategoryServices from "../services/subcategory.service";
import { getAuth } from "@clerk/express";

export const addSubcategoryController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    const { name, imageUrl, filePath, categoryId } = req.body;

    const data = { name, imageUrl, filePath, categoryId };
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

    const subcategory = await subcategoryServices.addSubcategoryService(data);
    res.status(201).json({ message: "Subcategory added", subcategory });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchAllSubcategoriesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    // const { userId } = getAuth(req);
    // if (!userId) {
    //   errorMessage = "Unauthorized: Invalid token";
    //   console.log(errorMessage);
    //   return res.status(401).json({ error: errorMessage });
    // }

    const subcategory =
      await subcategoryServices.fetchAllSubcategoriesService();
    res.status(200).json({ total: subcategory.length, subcategory });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchSingleSubcategoryController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { id } = req.params;

    if (!id) {
      errorMessage = "Required param is missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    // const { userId } = getAuth(req);
    // if (!userId) {
    //   errorMessage = "Unauthorized: Invalid token";
    //   console.log(errorMessage);
    //   return res.status(401).json({ error: errorMessage });
    // }

    const subcategory = await subcategoryServices.fetchSingleSubcategoryService(
      id as string,
    );
    res.status(200).json({ subcategory });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchSubcategoryByCategoryController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      errorMessage = "Required category param is missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    // const { userId } = getAuth(req);
    // if (!userId) {
    //   errorMessage = "Unauthorized: Invalid token";
    //   console.log(errorMessage);
    //   return res.status(401).json({ error: errorMessage });
    // }

    const subcategory =
      await subcategoryServices.fetchSubcategoryByCategoryService(
        categoryId as string,
      );
    res.status(200).json({ subcategory });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateSubcategoryController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    let { id } = req.params;
    const { name, imageUrl, categoryId } = req.body;

    const body = { name, imageUrl, categoryId };
    if (!body) {
      errorMessage = "Required param and fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    id = id as string;
    const data = { id, name, imageUrl, categoryId };

    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const subcategory =
      await subcategoryServices.updateSubcategoryService(data);
    res.status(200).json({ message: "Subcategory updated", subcategory });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteSubcategoryController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { id } = req.params;

    if (!id) {
      errorMessage = "Required param is missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const subcategory = await subcategoryServices.deleteSubcategoryService(
      id as string,
    );
    res.status(204).json({ message: "Subategory deleted", subcategory });
  } catch (error: any) {
    console.log(error.message);
  }
};
