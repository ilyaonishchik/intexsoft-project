import { IPaymentStatus } from '@a2seven/yoo-checkout';
import { Address } from 'src/address/models/entities/address.entity';
import { OrderItem } from 'src/order-item/models/entities/order-item.entity';
import { User } from 'src/user/models/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  paymentStatus: IPaymentStatus;
}
