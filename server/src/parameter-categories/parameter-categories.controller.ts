import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParameterCategoriesService } from './parameter-categories.service';
import { CreateParameterCategoryDto } from './models/dto/create-parameter-category.dto';
import { UpdateParameterCategoryDto } from './models/dto/update-parameter-category.dto';

@Controller('parameter-categories')
export class ParameterCategoriesController {
  constructor(private readonly parameterCategoriesService: ParameterCategoriesService) {}

  @Post()
  create(@Body() createParameterCategoryDto: CreateParameterCategoryDto) {
    return this.parameterCategoriesService.create(createParameterCategoryDto);
  }

  @Get()
  findAll() {
    return this.parameterCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parameterCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParameterCategoryDto: UpdateParameterCategoryDto) {
    return this.parameterCategoriesService.update(+id, updateParameterCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.parameterCategoriesService.delete(+id);
  }
}
