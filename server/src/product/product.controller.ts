import { Controller, Get, Post, Body, Param, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

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
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
