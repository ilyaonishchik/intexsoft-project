import { Category, ProductImage, ProductParameter } from '.';

export type Product = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  quantity: number;
  images?: ProductImage[];
  category?: Category;
  parameters?: ProductParameter[];
};
