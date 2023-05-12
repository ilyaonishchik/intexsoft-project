import { ParameterType } from '../unions/parameter-type.union';

export class CreateParameterDto {
  name: string;
  categoryId: number;
  ordinal: number;
  type: ParameterType;
}
