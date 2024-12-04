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

export interface IShop {
  id: string;
  name: string;
  description: string;
  logo: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: TUser;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  price: number;
  product: IProduct;
  quantity: number;
  productId: string;
}

export interface IOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  shopId: string;
  status: string;
  totalAmount: number;
  user: TUser;
  shop: IShop;
  orderItems: IOrderItem[];
}
