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
