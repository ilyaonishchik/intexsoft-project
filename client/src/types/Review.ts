import { Product, User } from '.';

export type Review = {
  id: number;
  user?: User;
  product?: Product;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
};
