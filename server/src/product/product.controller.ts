import { Controller, Get, Post, Body, Param, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';
import { CreateProductDto } from './models/dto/create-product.dto';
import { Product } from './models/entities/product.entity';
import { OrderEnum } from 'src/_common/enums/order.enum';

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
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('sortBy') sortBy = 'updatedAt',
    @Query('order') order = OrderEnum.desc,
  ): Promise<[Product[], number]> {
    return this.productService.findAll(skip, take, sortBy, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
