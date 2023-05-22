import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImageService {
  constructor(@InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>) {}

  create(dto: CreateProductImageDto): Promise<ProductImage> {
    return this.productImageRepository.save(dto);
  }
}
