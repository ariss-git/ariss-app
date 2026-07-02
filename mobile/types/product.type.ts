export type FetchAllProductsBySubcategoryType = {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  quantity: number;
};

export type FetchSingleProductType = {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  price: number;
  createdAt: string;
  warranty: number;
  quantity: number;
};
