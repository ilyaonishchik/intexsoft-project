import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterCategoryDto } from './models/dto/create-parameter-category.dto';
import { ParameterCategory } from './models/entities/parameter-category.entity';

@Injectable()
export class ParameterCategoryService {
  constructor(
    @InjectRepository(ParameterCategory) private readonly parameterCategoryRepository: Repository<ParameterCategory>,
  ) {}

  create(dto: CreateParameterCategoryDto): Promise<ParameterCategory> {
    const parameterCategory = this.parameterCategoryRepository.create(dto);
    return this.parameterCategoryRepository.save(parameterCategory);
  }

  findAll(): Promise<ParameterCategory[]> {
    return this.parameterCategoryRepository.find();
  }

  findOne(id: number): Promise<ParameterCategory> {
    return this.parameterCategoryRepository.findOne({ where: { id } });
  }
}
