import { Image } from 'src/image/models/entities/image.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  // @OneToMany(() => ProductImage, (image) => image.product)
  // images: ProductImage[];
}
