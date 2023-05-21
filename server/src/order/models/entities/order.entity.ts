import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
