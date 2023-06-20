import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/entities/product.entity';
import { Category } from 'src/category/models/entities/category.entity';
import { Image } from 'src/image/models/entities/image.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Parameter } from 'src/parameter/models/entities/parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Image, ProductImage, Parameter])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
