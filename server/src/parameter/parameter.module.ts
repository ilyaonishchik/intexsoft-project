import { Module } from '@nestjs/common';
import { ParameterController } from './parameter.controller';
import { ParameterService } from './parameter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parameter } from './models/entities/parameter.entity';
import { ParameterCategoryModule } from 'src/parameter-category/parameter-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter]), ParameterCategoryModule],
  controllers: [ParameterController],
  providers: [ParameterService],
})
export class ParameterModule {}
