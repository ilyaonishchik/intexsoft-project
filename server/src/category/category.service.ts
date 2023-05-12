import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './models/entities/category.entity';
import { CreateCategoryDto } from './models/dto/create-category.dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly imageService: ImageService,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { name, image, parentId } = dto;
    let parent = null;
    if (parentId) {
      parent = await this.categoryRepository.findOne({ where: { id: parentId } });
      if (!parent) throw new NotFoundException(`Category with id ${parentId} not found`);
    }
    const category = this.categoryRepository.create({
      ...dto,
      parent,
      image: image ? await this.imageService.create({ name: image.filename, alt: name }) : null,
    });
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: { image: true, parent: true, children: true } });
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: { image: true, parent: true, children: true },
    });
  }
}
