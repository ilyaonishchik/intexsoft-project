import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  alt: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.image, { cascade: true })
  productImages: ProductImage[];
}
