import { Parameter } from '.';

export type ParameterCategory = {
  id: number;
  name: string;
  ordinal: number;
  parameters?: Parameter[];
};
