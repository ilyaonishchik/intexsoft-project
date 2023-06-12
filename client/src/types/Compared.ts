import { Product, User } from '.';

export type Compared = {
  id: number;
  user?: User;
  products?: Product[];
};
