import { IPaymentStatus } from '@a2seven/yoo-checkout';
import { OrderItem } from '.';
import { Address } from './Address';
import { User } from './User';
import { OrderStatus } from './OrderStatus';

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
