export class CreateParameterDto {
  name: string;
  categoryId: number;
  ordinal: number;
  filterType: 'check' | 'range';
}
