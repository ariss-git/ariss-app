import prisma from "../../lib/orm";
import type { AddSubcategory, UpdateSubcategory } from "../../types/stock.type";

export const addSubcategoryService = async (data: AddSubcategory) => {
  const existing = await prisma.subcategories.findUnique({
    where: {
      name: data.name,
    },
  });
  if (existing) throw new Error("Subcategory already exists");

  const subcategory = await prisma.subcategories.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      filePath: data.filePath,
      categoryId: data.categoryId,
    },
  });

  return subcategory;
};

export const fetchAllSubcategoriesService = async () => {
  return await prisma.subcategories.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      filePath: true,
      categoryId: true,
      createdAt: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const fetchSingleSubcategoryService = async (id: string) => {
  return await prisma.subcategories.findUnique({
    where: {
      id,
    },
  });
};

export const fetchSubcategoryByCategory = async (categoryId: string) => {
  return await prisma.subcategories.findMany({
    where: {
      categoryId,
    },
  });
};

export const updateSubcategoryService = async (data: UpdateSubcategory) => {
  const subcategory = await prisma.subcategories.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
    },
  });

  return subcategory;
};

export const deleteSubcategoryService = async (id: string) => {
  const subcategory = await prisma.subcategories.delete({
    where: {
      id,
    },
  });

  return subcategory;
};
