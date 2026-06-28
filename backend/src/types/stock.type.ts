export type AddCategory = {
  name: string;
  imageUrl: string;
  filePath: string;
};

export type UpdateCategory = {
  name: string;
  imageUrl: string;
};

export type AddSubcategory = {
  name: string;
  imageUrl: string;
  filePath: string;
  categoryId: string;
};

export type UpdateSubcategory = {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: string;
};

export type AddProduct = {
  name: string;
  description: string;
  sku: string;
  type: string;
  label: string;
  warranty: number;
  quantity: number;
  usps: string;
  imageUrls: string[];
  filePath: string[];
  subcategoryId: string;
};
