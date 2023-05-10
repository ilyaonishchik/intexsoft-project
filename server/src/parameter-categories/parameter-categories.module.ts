import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterCategoriesService } from './parameter-categories.service';
import { ParameterCategoriesController } from './parameter-categories.controller';
import { ParameterCategory } from './models/entities/parameter-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParameterCategory])],
  controllers: [ParameterCategoriesController],
  providers: [ParameterCategoriesService],
  exports: [ParameterCategoriesService],
})
export class ParameterCategoriesModule {}
