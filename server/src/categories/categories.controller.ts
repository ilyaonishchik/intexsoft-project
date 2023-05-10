import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { CategoriesService } from './categories.service';
import { ImagesService } from 'src/images/images.service';
import { CreateCategoryDto } from './models/dto/create-category.dto';
import { Category } from './models/entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService, private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static',
        filename: (_, file, cb) => {
          const extension = file.originalname.split('.')[1];
          const filename = v4() + '.' + extension;
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() { name, ordinal, parentId }: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Category> {
    return this.categoriesService.create({
      name,
      image: file ? await this.imagesService.create({ name: file.filename, alt: name }) : null,
      ordinal,
      parentId,
    });
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }
}
