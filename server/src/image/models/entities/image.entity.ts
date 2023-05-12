import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  alt: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.image)
  productImages: ProductImage[];
}
