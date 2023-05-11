import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './models/entities/category.entity';
import { CreateCategoryDto } from './models/dto/create-category.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    private imagesService: ImagesService,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { name, image, parentId } = dto;
    let parent = null;
    if (parentId) {
      parent = await this.categoriesRepository.findOne({ where: { id: parentId } });
      if (!parent) throw new NotFoundException(`Category with id ${parentId} not found`);
    }
    const category = this.categoriesRepository.create({
      ...dto,
      parent,
      image: image ? await this.imagesService.create({ name: image.filename, alt: name }) : null,
    });
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
