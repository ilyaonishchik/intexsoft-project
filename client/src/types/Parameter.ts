import { ParameterCategory, ProductParameter } from '.';

export type Parameter = {
  id: number;
  name: string;
  label: string;
  unit: string | null;
  description: string | null;
  ordinal: number;
  comparable: boolean | null;
  comparisonType: 'boolean' | 'number' | 'score' | null;
  defaultValue: string | null;
  defaultScore: number | null;
  productParameters?: ProductParameter[];
  category?: ParameterCategory;
};
