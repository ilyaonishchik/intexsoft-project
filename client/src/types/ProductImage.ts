import { Product, Image } from '.';

export type ProductImage = {
  id: number;
  product: Product;
  image: Image;
  ordinal: number;
};
