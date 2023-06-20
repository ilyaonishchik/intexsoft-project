export type Filter = {
  name: string;
  unit: string | null;
  type: 'check' | 'range';
  availableValues: string[];
  values: string[];
  opened: boolean;
  ordinal: number;
};
