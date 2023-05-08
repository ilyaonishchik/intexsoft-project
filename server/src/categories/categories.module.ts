import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { Category } from './models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ImagesModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
