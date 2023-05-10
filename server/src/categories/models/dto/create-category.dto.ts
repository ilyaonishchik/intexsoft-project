import { Image } from 'src/images/models/entities/image.entity';

export class CreateCategoryDto {
  name: string;
  image?: Image;
  ordinal: number;
  parentId?: number;
}
