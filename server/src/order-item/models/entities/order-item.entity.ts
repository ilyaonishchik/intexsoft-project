import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
