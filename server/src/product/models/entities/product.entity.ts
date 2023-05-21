import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Category } from 'src/category/models/entities/category.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];
}
