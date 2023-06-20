import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/models/entities/product.entity';
import { Category } from 'src/category/models/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
