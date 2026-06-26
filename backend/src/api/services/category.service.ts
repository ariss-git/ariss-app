import prisma from "../../lib/orm";
import type { AddCategory, UpdateCategory } from "../../types/stock.type";

export const addCategoryService = async (data: AddCategory) => {
  const existing = await prisma.categories.findUnique({
    where: {
      name: data.name,
    },
  });
  if (existing) throw new Error("Category already exists");

  const category = await prisma.categories.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      filePath: data.filePath
    },
  });

  return category;
};

export const fetchAllCategoriesService = async () => {
  return await prisma.categories.findMany();
};

export const fetchSingleCategoryService = async (id: string) => {
  return await prisma.categories.findUnique({
    where: {
      id,
    },
  });
};

export const updateCategoryService = async (id: string, data: UpdateCategory) => {
  const category = await prisma.categories.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
    },
  });

  return category;
};

export const deleteCategoryService = async (id: string) => {
  const category = await prisma.categories.delete({
    where: {
      id,
    },
  });

  return category;
};
