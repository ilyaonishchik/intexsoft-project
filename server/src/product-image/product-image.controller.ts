import { Controller, Post, Body } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';

@Controller('products-images')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  create(@Body() dto: CreateProductImageDto) {
    return this.productImageService.create(dto);
  }
}
