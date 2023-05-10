import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { CreateParameterDto } from './models/dto/create-parameter.dto';
import { Parameter } from './models/entities/parameter.entity';
import { UpdateParameterDto } from './models/dto/update-parameter.dto';

@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Post()
  create(@Body() dto: CreateParameterDto): Promise<Parameter> {
    return this.parametersService.create(dto);
  }

  @Get()
  findAll(): Promise<Parameter[]> {
    return this.parametersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Parameter> {
    return this.parametersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParameterDto) {
    return this.parametersService.update(+id, dto);
  }
}
