import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './models/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './models/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private imagesRepository: Repository<Image>) {}

  create(dto: CreateImageDto): Promise<Image> {
    const image = this.imagesRepository.create(dto);
    return this.imagesRepository.save(image);
  }
}
