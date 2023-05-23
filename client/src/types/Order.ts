import { IPaymentStatus } from '@a2seven/yoo-checkout';
import { OrderItem } from '.';
import { Address } from './Address';
import { User } from './User';

export type Order = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  name: string;
  surname: string;
  address?: Address;
  items: OrderItem[];
  amount: number;
  paymentStatus: IPaymentStatus;
};
