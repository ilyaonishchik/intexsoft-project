import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './models/image.entity';
import { DeleteResult } from 'typeorm';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get()
  findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.imagesService.delete(id);
  }
}
