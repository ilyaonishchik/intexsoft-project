import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/product/models/entities/product.entity';
import { Image } from 'src/image/models/entities/image.entity';

@Entity('product-image')
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Image, (image) => image.productImages)
  image: Image;

  @Column()
  ordinal: number;
}
