import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, In, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateProductDto } from './models/dto/create-product.dto';
import { Product } from './models/entities/product.entity';
import { MessageResponse } from 'src/_common/message.response';
import { Category } from 'src/category/models/entities/category.entity';
import { Image } from 'src/image/models/entities/image.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Parameter } from 'src/parameter/models/entities/parameter.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Parameter) private readonly parameterRepository: Repository<Parameter>,
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

  async findAll(
    skip: number,
    take: number,
    sortBy: string,
    order: string,
    categoryName: string,
    minPrice: number,
    maxPrice: number,
    query: string,
    rest: object,
  ): Promise<[Product[], number]> {
    const ids = Object.keys(rest).length ? await this.findProductsIdsByFiltersQuery(rest) : null;

    return this.productRepository.findAndCount({
      where: {
        name: query ? ILike(`%${query}%`) : null,
        id: Object.keys(rest).length ? In(ids) : null,
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
      relations: {
        category: true,
        images: { image: true },
        parameters: { parameter: { category: true } },
        group: true,
      },
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async delete(id: number): Promise<MessageResponse> {
    await this.productRepository.delete({ id });
    return { message: `Product with id ${id} deleted succesfully` };
  }

  async findProductsIdsByFiltersQuery(query: object) {
    const items: { parameter: Parameter; values: string[] }[] = [];
    for (const key in query) {
      const parameter = await this.parameterRepository.findOne({ where: { name: key } });
      items.push({ parameter, values: query[key].split(',') });
    }

    const rows = items.map((item, index) => {
      let row = index ? 'OR ' : 'WHERE ';
      row += `(parameter.name = '${item.parameter.name}' AND product_parameter.`;
      row +=
        item.parameter.filterType === 'check'
          ? `value IN ('${item.values.join("', '")}'))`
          : `score BETWEEN ${item.values[0]} AND ${item.values[1]})`;
      return row;
    });

    const sqlQuery = `
      SELECT product.id FROM product
      JOIN product_parameter ON product.id = product_parameter.productId
      JOIN parameter ON parameter.id = product_parameter.parameterId
      ${rows.join('\n      ')}
      GROUP BY product.id
      HAVING COUNT(DISTINCT parameter.name) = ${rows.length};
    `;

    return (await this.productRepository.query(sqlQuery)).map((item) => item.id);
  }

  // async findProductsNamesByFiltersQuery(query: object): Promise<string[]> {
  //   const items: { parameter: Parameter; values: string[] }[] = [];
  //   for (const key in query) {
  //     const parameter = await this.parameterRepository.findOne({ where: { name: key } });
  //     items.push({ parameter, values: query[key].split(',') });
  //   }

  //   const rows = items.map((item, index) => {
  //     let row = index ? 'OR ' : 'WHERE ';
  //     row += `(parameter.name = '${item.parameter.name}' AND product_parameter.`;
  //     row +=
  //       item.parameter.filterType === 'check'
  //         ? `value IN ('${item.values.join("', '")}'))`
  //         : `score BETWEEN ${item.values[0]} AND ${item.values[1]})`;
  //     return row;
  //   });

  //   const sqlQuery = `
  //     SELECT product.name FROM product
  //     JOIN product_parameter ON product.id = product_parameter.productId
  //     JOIN parameter ON parameter.id = product_parameter.parameterId
  //     ${rows.join('\n      ')}
  //     GROUP BY product.id
  //     HAVING COUNT(DISTINCT parameter.name) = ${rows.length};
  //   `;

  //   return (await this.productRepository.query(sqlQuery)).map((item) => item.name);
  // }
}
