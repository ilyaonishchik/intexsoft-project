import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ParameterCategoriesService } from './parameter-categories.service';
import { CreateParameterCategoryDto } from './models/dto/create-parameter-category.dto';
import { ParameterCategory } from './models/entities/parameter-category.entity';

@Controller('parameter-categories')
export class ParameterCategoriesController {
  constructor(private readonly parameterCategoriesService: ParameterCategoriesService) {}

  @Post()
  create(@Body() dto: CreateParameterCategoryDto): Promise<ParameterCategory> {
    return this.parameterCategoriesService.create(dto);
  }

  @Get()
  findAll(): Promise<ParameterCategory[]> {
    return this.parameterCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ParameterCategory> {
    return this.parameterCategoriesService.findOne(+id);
  }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.parameterCategoriesService.delete(+id);
  // }
}
