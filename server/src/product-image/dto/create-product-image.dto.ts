import { Image } from 'src/image/models/entities/image.entity';
import { Product } from 'src/product/models/entities/product.entity';

export class CreateProductImageDto {
  product: Product;
  image: Image;
  ordinal: number;
}
