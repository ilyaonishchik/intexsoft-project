import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './models/entities/image.entity';
import { DeleteResult } from 'typeorm';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.imageService.delete(id);
  }
}
