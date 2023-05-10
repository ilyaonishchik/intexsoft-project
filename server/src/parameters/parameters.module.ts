import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parameter } from './models/entities/parameter.entity';
import { ParameterCategoriesModule } from 'src/parameter-categories/parameter-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter]), ParameterCategoriesModule],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
