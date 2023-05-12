import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImageService {
  create(createProductImageDto: CreateProductImageDto) {
    return 'This action adds a new productsImage';
  }

  findAll() {
    return `This action returns all productsImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsImage`;
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productsImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsImage`;
  }
}
