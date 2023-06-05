import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateProductDto } from './models/dto/create-product.dto';
import { Product } from './models/entities/product.entity';
import { OrderEnum } from 'src/_common/enums/order.enum';
import { MessageResponse } from 'src/_common/message.response';
import { Category } from 'src/category/models/entities/category.entity';
import { Image } from 'src/image/models/entities/image.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create({ categoryId, files, name, price, quantity }: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException(`Category with id ${categoryId} not found`);
    const product = await this.productRepository.save({ category, name, price, quantity });
    files.forEach(async (file, index) => {
      const image = await this.imageRepository.save({ name: file.filename, alt: name });
      await this.productImageRepository.save({ image, product, ordinal: index + 1 });
    });
    return product;
  }

  findAll(
    skip: number,
    take: number,
    sortBy: string,
    order: OrderEnum,
    categoryName: string,
    minPrice: number,
    maxPrice: number,
  ): Promise<[Product[], number]> {
    console.log(minPrice, maxPrice);
    return this.productRepository.findAndCount({
      where: {
        category: { name: categoryName },
        price:
          minPrice && maxPrice
            ? Between(minPrice, maxPrice)
            : minPrice
            ? MoreThan(minPrice)
            : maxPrice
            ? LessThan(maxPrice)
            : null,
      },
      relations: { category: true, images: { image: true } },
      skip,
      take,
      order: { [sortBy]: order },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true, images: { image: true } },
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async delete(id: number): Promise<MessageResponse> {
    await this.productRepository.delete({ id });
    return { message: `Product with id ${id} deleted succesfully` };
  }
}
