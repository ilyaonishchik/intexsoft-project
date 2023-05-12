import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { CreateParameterDto } from './models/dto/create-parameter.dto';
import { Parameter } from './models/entities/parameter.entity';
import { UpdateParameterDto } from './models/dto/update-parameter.dto';

@Controller('parameters')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @Post()
  create(@Body() dto: CreateParameterDto): Promise<Parameter> {
    return this.parameterService.create(dto);
  }

  @Get()
  findAll(): Promise<Parameter[]> {
    return this.parameterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Parameter> {
    return this.parameterService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParameterDto) {
    return this.parameterService.update(+id, dto);
  }
}
