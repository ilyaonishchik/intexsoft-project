import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorites } from './models/entities/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/entities/product.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites) private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async toggle(userId: number, productId: number): Promise<Favorites> {
    const favorites = await this.favoritesRepository.findOne({
      where: { user: { id: userId } },
      relations: { products: true },
    });
    if (!favorites) throw new NotFoundException(`Favorites of user with id ${userId} not found`);
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);
    const favoritesProduct = favorites.products.find((item) => item.id === productId);
    favoritesProduct
      ? (favorites.products = favorites.products.filter((item) => item.id !== productId))
      : favorites.products.push(product);
    return this.favoritesRepository.save(favorites);
  }

  async findOne(userId: number): Promise<Favorites> {
    const favorties = await this.favoritesRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        products: { category: true, images: { image: true }, parameters: { parameter: { category: true } } },
      },
    });
    if (!favorties) throw new NotFoundException(`Favorites of user with id ${userId} not found`);
    return favorties;
  }
}
