import { Injectable } from '@nestjs/common';
import { CreateParameterCategoryDto } from './models/dto/create-parameter-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParameterCategory } from './models/entities/parameter-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParameterCategoriesService {
  constructor(
    @InjectRepository(ParameterCategory) private readonly parameterCategoriesRepository: Repository<ParameterCategory>,
  ) {}

  create(dto: CreateParameterCategoryDto): Promise<ParameterCategory> {
    const parameterCategory = this.parameterCategoriesRepository.create(dto);
    return this.parameterCategoriesRepository.save(parameterCategory);
  }

  findAll(): Promise<ParameterCategory[]> {
    return this.parameterCategoriesRepository.find();
  }

  findOne(id: number): Promise<ParameterCategory> {
    return this.parameterCategoriesRepository.findOne({ where: { id } });
  }

  // delete(id: number) {
  //   return `This action deletes a #${id} parameterCategory`;
  // }
}
