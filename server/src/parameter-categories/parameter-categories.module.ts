import { Module } from '@nestjs/common';
import { ParameterCategoriesService } from './parameter-categories.service';
import { ParameterCategoriesController } from './parameter-categories.controller';

@Module({
  controllers: [ParameterCategoriesController],
  providers: [ParameterCategoriesService],
})
export class ParameterCategoriesModule {}
