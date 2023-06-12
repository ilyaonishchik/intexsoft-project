import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compared } from './models/entities/compared.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/entities/product.entity';

@Injectable()
export class ComparedService {
  constructor(
    @InjectRepository(Compared) private readonly comparedRepository: Repository<Compared>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async toggle(userId: number, productId: number): Promise<Compared> {
    const compared = await this.comparedRepository.findOne({
      where: { user: { id: userId } },
      relations: { products: true },
    });
    if (!compared) throw new NotFoundException(`Compared of user with id ${userId} not found`);
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);
    const comparedProduct = compared.products.find((item) => item.id === productId);
    comparedProduct
      ? (compared.products = compared.products.filter((item) => item.id !== productId))
      : compared.products.push(product);
    return this.comparedRepository.save(compared);
  }

  async findOne(userId: number): Promise<Compared> {
    const compared = await this.comparedRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        products: { category: true, images: { image: true }, parameters: { parameter: { category: true } } },
      },
    });
    if (!compared) throw new NotFoundException(`Compared of user with id ${userId} not found`);
    return compared;
  }
}
