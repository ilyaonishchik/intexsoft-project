export class CreateProductDto {
  name: string;
  categoryId: number;
  price: number;
  quantity: number;
  files: Express.Multer.File[];
}
