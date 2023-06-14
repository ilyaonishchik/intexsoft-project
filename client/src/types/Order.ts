import { IPaymentStatus } from '@a2seven/yoo-checkout';
import { OrderItem, OrderStatus, User, Address } from '.';

export type Order = {
  id: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  name: string;
  surname: string;
  address?: Address;
  items: OrderItem[];
  amount: number;
  paymentStatus: IPaymentStatus;
  status: OrderStatus;
};
