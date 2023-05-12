import { Image } from 'src/image/models/entities/image.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products-images')
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @ManyToOne(() => Product, (product) => product.images)
  // product: Product;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @Column()
  ordinal: number;
}
