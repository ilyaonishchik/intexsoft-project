import { Parameter, Product } from '.';

export type ProductParameter = {
  id: number;
  product?: Product;
  parameter?: Parameter;
  value: string;
  score: number | null;
};
