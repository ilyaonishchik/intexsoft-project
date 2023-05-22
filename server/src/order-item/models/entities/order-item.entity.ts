import { Order } from 'src/order/models/entities/order.entity';
import { Product } from 'src/product/models/entities/product.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
}
