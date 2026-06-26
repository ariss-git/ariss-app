export type AddCategory = {
  name: string;
  imageUrl: string;
  filePath: string;
};

export type UpdateCategory = {
  name: string;
  imageUrl: string;
  filePath: string;
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
  filePath: string;
  categoryId: string;
};
