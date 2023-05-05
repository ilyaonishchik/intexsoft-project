import { useMediaQuery } from '@mantine/hooks';

const types = {
  smaller: 'max-width',
  larger: 'min-width',
};

const values = {
  xs: '36em',
  sm: '48em',
  md: '62em',
  lg: '75em',
  xl: '88em',
};

export const useCustomMediaQuery = (type: 'larger' | 'smaller', value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  return useMediaQuery(`(${types[type]}: ${values[value]})`);
};
