import { Controller, Get, Post, Body, Param, UploadedFiles, UseInterceptors, Query, Delete } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';
import { CreateProductDto } from './models/dto/create-product.dto';
import { Product } from './models/entities/product.entity';
import { MessageResponse } from 'src/_common/message.response';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
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
  create(@Body() dto: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.productService.create({ ...dto, files });
  }

  @Get()
  findAll(
    @Query()
    {
      take,
      skip,
      sortBy = 'updatedAt',
      order = 'desc',
      categoryName,
      minPrice,
      maxPrice,
      query,
      ...rest
    }: {
      take: number;
      skip: number;
      sortBy: string;
      order: string;
      categoryName: string;
      minPrice: number;
      maxPrice: number;
      query: string;
    },
  ): Promise<[Product[], number]> {
    return this.productService.findAll(skip, take, sortBy, order, categoryName, minPrice, maxPrice, query, rest);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<MessageResponse> {
    return this.productService.delete(id);
  }
}
