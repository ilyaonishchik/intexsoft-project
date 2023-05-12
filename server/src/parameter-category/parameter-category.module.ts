import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterCategoryService } from './parameter-category.service';
import { ParameterCategoryController } from './parameter-category.controller';
import { ParameterCategory } from './models/entities/parameter-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParameterCategory])],
  controllers: [ParameterCategoryController],
  providers: [ParameterCategoryService],
  exports: [ParameterCategoryService],
})
export class ParameterCategoryModule {}
