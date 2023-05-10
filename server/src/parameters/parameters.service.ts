import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parameter } from './models/entities/parameter.entity';
import { CreateParameterDto } from './models/dto/create-parameter.dto';
import { ParameterCategoriesService } from 'src/parameter-categories/parameter-categories.service';
import { UpdateParameterDto } from './models/dto/update-parameter.dto';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter) private readonly parametersRepository: Repository<Parameter>,
    private readonly parameterCategoriesService: ParameterCategoriesService,
  ) {}

  async create(dto: CreateParameterDto): Promise<Parameter> {
    const category = await this.parameterCategoriesService.findOne(dto.categoryId);
    if (!category) throw new NotFoundException(`Parameter category with id ${dto.categoryId} not found`);
    const parameter = this.parametersRepository.create({ ...dto, category });
    return this.parametersRepository.save(parameter);
  }

  findAll(): Promise<Parameter[]> {
    return this.parametersRepository.find({ relations: { category: true } });
  }

  findOne(id: number): Promise<Parameter> {
    return this.parametersRepository.findOne({ where: { id }, relations: { category: true } });
  }

  async update(id: number, dto: UpdateParameterDto): Promise<Parameter> {
    const parameter = await this.findOne(id);
    if (!parameter) throw new NotFoundException(`Parameter with id ${id} not found`);
    if (dto.categoryId) {
      const category = await this.parameterCategoriesService.findOne(dto.categoryId);
      if (!category) throw new NotFoundException(`Parameter category with id ${dto.categoryId} not found`);
      parameter.category = category;
    }
    return this.parametersRepository.save({ ...parameter, ...dto });
  }
}
