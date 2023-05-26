import { Order, Product } from '.';

export type OrderItem = {
  id: number;
  order?: Order;
  product?: Product;
  quantity: number;
  price: number;
};
