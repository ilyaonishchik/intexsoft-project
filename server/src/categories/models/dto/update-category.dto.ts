import { Image } from 'src/images/models/image.entity';

export class UpdateCategoryDto {
  name: string;
  image?: Image;
  ordinal: number;
  parentId?: number;
}
