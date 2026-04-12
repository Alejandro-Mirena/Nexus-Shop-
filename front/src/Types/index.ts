export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  discount?: number;
  isOnSale?: boolean;
}

export interface ICategory {
  id: number;
  name: string;
}
