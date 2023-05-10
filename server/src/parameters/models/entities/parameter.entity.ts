import { Entity } from 'typeorm';

@Entity('parameters')
export class Parameter {
  id: number;
  name: string;
  ordinal: number;
  type: 'check' | 'range';
}
