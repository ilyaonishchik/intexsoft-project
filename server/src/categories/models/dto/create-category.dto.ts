export class CreateCategoryDto {
  name: string;
  image?: Express.Multer.File;
  ordinal: number;
  parentId?: number;
}
