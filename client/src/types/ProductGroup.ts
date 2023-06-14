import { Parameter, Product } from '.';

export type ProductGroup = {
  id: number;
  name: string;
  products?: Product[];
  parameters?: Parameter[];
};
