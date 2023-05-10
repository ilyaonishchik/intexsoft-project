import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './models/entities/category.entity';
import { CreateCategoryDto } from './models/dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const parent = dto.parentId ? await this.categoriesRepository.findOne({ where: { id: dto.parentId } }) : null;
    const category = this.categoriesRepository.create({ ...dto, parent });
    return this.categoriesRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: { image: true, parent: true, children: true } });
  }

  findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({
      where: { id },
      relations: { image: true, parent: true, children: true },
    });
  }
}
