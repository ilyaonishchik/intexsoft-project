import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { ImageModule } from 'src/image/image.module';
import { ProductImageModule } from 'src/product-image/product-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule, ImageModule, ProductImageModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
