import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './models/entities/favorites.entity';
import { Product } from 'src/product/models/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Product])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
