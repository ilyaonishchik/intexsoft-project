import { Injectable } from '@nestjs/common';
import { CreateParameterCategoryDto } from './models/dto/create-parameter-category.dto';
import { UpdateParameterCategoryDto } from './models/dto/update-parameter-category.dto';

@Injectable()
export class ParameterCategoriesService {
  create(createParameterCategoryDto: CreateParameterCategoryDto) {
    return 'This action adds a new parameterCategory';
  }

  findAll() {
    return `This action returns all parameterCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parameterCategory`;
  }

  update(id: number, updateParameterCategoryDto: UpdateParameterCategoryDto) {
    return `This action updates a #${id} parameterCategory`;
  }

  delete(id: number) {
    return `This action deletes a #${id} parameterCategory`;
  }
}
