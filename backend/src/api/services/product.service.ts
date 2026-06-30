import prisma from "../../lib/orm";
import { AddProduct } from "../../types/stock.type";

export const addProductService = async (data: AddProduct) => {
  const existing = await prisma.products.findUnique({
    where: {
      name: data.name,
    },
  });
  if (existing) {
    throw new Error("Product already exists");
  }
  const product = await prisma.products.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      label: data.label,
      warranty: data.warranty,
      quantity: data.quantity,
      sku: data.sku,
      usps: data.usps,
      imageUrls: data.imageUrls,
      filePath: data.filePath,
      subcategoryId: data.subcategoryId,
    },
  });
  return product;
};

export const fetchAllProductsService = async () => {
  return await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      type: true,
      label: true,
      warranty: true,
      quantity: true,
      sku: true,
      usps: true,
      imageUrls: true,
      status: true,
      filePath: true,
      subcategoryId: true,
      subcategories: {
        select: {
          name: true,
          categories: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const fetchAllProductsBySubcategoryService = async (
  subcategoryId: string,
) => {
  return await prisma.products.findMany({
    where: {
      subcategoryId,
      status: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      imageUrls: true,
      quantity: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
