import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './models/dto/create-product.dto';
import { Product } from './models/entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { ImageService } from 'src/image/image.service';
import { ProductImageService } from 'src/product-image/product-image.service';
import { OrderEnum } from 'src/_common/enums/order.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
    private readonly productImageService: ProductImageService,
  ) {}

  async create({ categoryId, files, name, price, quantity }: CreateProductDto) {
    const category = await this.categoryService.findOne(categoryId);
    if (!category) throw new NotFoundException(`Category with id ${categoryId} not found`);
    const product = new Product();
    product.category = category;
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.images = [];
    files.forEach(async (file, index) => {
      const image = await this.imageService.create({ name: file.filename, alt: name });
      const productImage = await this.productImageService.create({ image, product, ordinal: index + 1 });
      product.images.push(productImage);
    });
    return this.productRepository.save(product);
  }

  findAll(skip: number, take: number, sortBy: string, order: OrderEnum): Promise<[Product[], number]> {
    return this.productRepository.findAndCount({
      relations: { category: true, images: { image: true } },
      skip,
      take,
      order: { [sortBy]: order },
    });
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id }, relations: { category: true, images: { image: true } } });
  }
}
