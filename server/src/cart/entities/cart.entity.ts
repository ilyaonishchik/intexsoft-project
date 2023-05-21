import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { User } from 'src/user/models/entities/user.entity';
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
