import { Order } from 'src/order/models/entities/order.entity';
import { User } from 'src/user/models/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  zip: number;

  @Column()
  street: string;

  @Column()
  house: string;

  @Column({ nullable: true })
  apartment?: string;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
