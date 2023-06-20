import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/models/entities/category.entity';
import { Product } from 'src/product/models/entities/product.entity';
import { Repository } from 'typeorm';
import { Filter } from './models/types/filter.type';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(categoryName: string) {
    const products = await this.productRepository.find({
      relations: { category: true, parameters: { parameter: { category: true } } },
      where: { category: { name: categoryName } },
    });

    const uniqueParameters = products
      .flatMap((product) => product.parameters.flatMap((productParameter) => productParameter.parameter))
      .filter((parameter, index, array) => index === array.findIndex((item) => item.id === parameter.id));

    const filters: Filter[] = uniqueParameters.map((uniqueParameter) => {
      const availableValuesSet = new Set<string>();

      products.forEach((product) => {
        const foundedProductParameter = product.parameters.find(
          (productParameter) => productParameter.parameter.id === uniqueParameter.id,
        );
        if (foundedProductParameter) {
          switch (foundedProductParameter.parameter.filterType) {
            case 'check':
              availableValuesSet.add(foundedProductParameter.value);
              break;
            case 'range':
              availableValuesSet.add(String(foundedProductParameter.score));
              break;
          }
        }
      });

      const availableValuesArray = Array.from(availableValuesSet);

      let availableValues: string[] = [];
      if (uniqueParameter.filterType === 'check') availableValues = availableValuesArray;
      else if (uniqueParameter.filterType === 'range') {
        availableValuesArray.sort((a, b) => Number(a) - Number(b));
        availableValues = [availableValuesArray[0], availableValuesArray[availableValuesArray.length - 1]];
      }

      return {
        name: uniqueParameter.label,
        unit: uniqueParameter.unit,
        type: uniqueParameter.filterType,
        availableValues,
        values: [],
        opened: false,
        ordinal: uniqueParameter.category.ordinal * 10 + uniqueParameter.ordinal,
      };
    });

    const prices = products.map((product) => product.price).sort((a, b) => a - b);
    const priceFilter = {
      min: prices[0],
      max: prices[prices.length - 1],
      from: prices[0],
      to: prices[prices.length - 1],
    };

    return [priceFilter, filters.sort((a, b) => a.ordinal - b.ordinal)];
  }
}
