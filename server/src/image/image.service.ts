import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './models/entities/image.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateImageDto } from './models/dto/create-image.dto';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>) {}

  create(dto: CreateImageDto): Promise<Image> {
    const image = this.imageRepository.create(dto);
    return this.imageRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  delete(id: number): Promise<DeleteResult> {
    return this.imageRepository.delete({ id });
  }
}
