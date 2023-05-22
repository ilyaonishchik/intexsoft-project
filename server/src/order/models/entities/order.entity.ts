import { IPaymentStatus } from '@a2seven/yoo-checkout';
import { OrderItem } from 'src/order-item/models/entities/order-item.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  paymentStatus: IPaymentStatus;
}
