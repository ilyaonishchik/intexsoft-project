import { Product } from '.';

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
