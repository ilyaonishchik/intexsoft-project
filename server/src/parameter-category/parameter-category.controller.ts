import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ParameterCategoryService } from './parameter-category.service';
import { CreateParameterCategoryDto } from './models/dto/create-parameter-category.dto';
import { ParameterCategory } from './models/entities/parameter-category.entity';

@Controller('parameter-categories')
export class ParameterCategoryController {
  constructor(private readonly parameterCategoryService: ParameterCategoryService) {}

  @Post()
  create(@Body() dto: CreateParameterCategoryDto): Promise<ParameterCategory> {
    return this.parameterCategoryService.create(dto);
  }

  @Get()
  findAll(): Promise<ParameterCategory[]> {
    return this.parameterCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ParameterCategory> {
    return this.parameterCategoryService.findOne(+id);
  }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.parameterCategoriesService.delete(+id);
  // }
}
