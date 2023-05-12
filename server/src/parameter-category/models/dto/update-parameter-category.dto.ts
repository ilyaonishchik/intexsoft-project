import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterCategoryDto } from './create-parameter-category.dto';

export class UpdateParameterCategoryDto extends PartialType(CreateParameterCategoryDto) {}
