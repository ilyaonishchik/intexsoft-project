import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGroup } from './models/entities/product-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductGroupService {
  constructor(@InjectRepository(ProductGroup) private readonly productGroupRepository: Repository<ProductGroup>) {}

  findOne(id: number): Promise<ProductGroup> {
    return this.productGroupRepository.findOne({
      where: { id },
      relations: { products: { parameters: { parameter: true } }, parameters: true },
    });
  }
}
