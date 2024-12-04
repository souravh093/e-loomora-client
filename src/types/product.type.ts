import { TUser } from "./user.type";

export interface IProductImage {
  url: string;
}

export interface ICategory {
  id: string;
  logo: string;
  name: string;
}

export interface IReview {
  content: string;
  rating: number;
  productId: string;
  userId: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  inventoryCount: number;
  productImage?: IProductImage[];
  category: ICategory;
  review: IReview[];
  categoryId: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  id: string;
  content: string;
  rating: number;
  productId: string;
  userId: string;
  createdAt: string;
  user: TUser;
  product: IProduct;
}