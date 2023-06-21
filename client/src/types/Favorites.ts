import { Product, User } from '.';

export type Favorites = {
  id: number;
  user?: User;
  products?: Product[];
};
