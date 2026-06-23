export type AddCategory = {
  name: string;
  imageUrl: string;
};

export type UpdateCategory = {
  name: string;
  imageUrl: string;
};

export type AddSubcategory = {
  name: string;
  imageUrl: string;
  categoryId: string;
};

export type UpdateSubcategory = {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: string;
};
