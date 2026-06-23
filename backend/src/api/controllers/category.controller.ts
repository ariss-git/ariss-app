import { Request, Response } from "express";
import * as categoryServices from "../services/category.service";
import { getAuth } from "@clerk/express";

export const addCategoryController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    const { name, imageUrl } = req.body;

    const data = { name, imageUrl };
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

    const category = await categoryServices.addCategoryService(data);
    res.status(201).json({ message: "Category added", category });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchAllCategoriesController = async (
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

    const category = await categoryServices.fetchAllCategoriesService();
    res.status(200).json({ total: category.length, category });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchSingleCategoryController = async (
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

    const category = await categoryServices.fetchSingleCategoryService(
      id as string,
    );
    res.status(200).json({ category });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    let { id } = req.params;
    const { name, imageUrl } = req.body;

    id = id as string;

    const data = { name, imageUrl };
    if (!data) {
      errorMessage = "Required param and fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const category = await categoryServices.updateCategoryService(id, data);
    res.status(200).json({ message: "Category updated", category });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
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

    const category = await categoryServices.deleteCategoryService(id as string);
    res.status(204).json({ message: "Category deleted", category });
  } catch (error: any) {
    console.log(error.message);
  }
};
