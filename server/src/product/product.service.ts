import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './models/dto/create-product.dto';
import { Product } from './models/entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { ImageService } from 'src/image/image.service';
import { ProductImageService } from 'src/product-image/product-image.service';
import { OrderEnum } from 'src/_common/enums/order.enum';
import { MessageResponse } from 'src/_common/message.response';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
    private readonly productImageService: ProductImageService,
  ) {}

  async create({ categoryId, files, name, price, quantity }: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.findOne(categoryId);
    if (!category) throw new NotFoundException(`Category with id ${categoryId} not found`);
    const product = await this.productRepository.save({ category, name, price, quantity });
    files.forEach(async (file, index) => {
      const image = await this.imageService.create({ name: file.filename, alt: name });
      await this.productImageService.create({ image, product, ordinal: index + 1 });
    });
    return product;
  }

  findAll(skip: number, take: number, sortBy: string, order: OrderEnum): Promise<[Product[], number]> {
    return this.productRepository.findAndCount({
      relations: { category: true, images: { image: true } },
      skip,
      take,
      order: { [sortBy]: order },
    });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id }, relations: { category: true, images: { image: true } } });
  }

  async delete(id: number): Promise<MessageResponse> {
    await this.productRepository.delete({ id });
    return { message: `Product with id ${id} deleted succesfully` };
  }
}
