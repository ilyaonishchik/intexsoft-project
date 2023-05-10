import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './models/entities/image.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateImageDto } from './models/dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private imagesRepository: Repository<Image>) {}

  create(dto: CreateImageDto): Promise<Image> {
    const image = this.imagesRepository.create(dto);
    return this.imagesRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  delete(id: number): Promise<DeleteResult> {
    return this.imagesRepository.delete({ id });
  }
}
