import { Button, Collapse, NumberInput, RangeSlider, SimpleGrid, Stack } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useAppDispatch } from '../../../redux/hooks';
import { changeFilter, toggleFilter } from '../../../redux/slices/catalogSlice';
import { Filter } from '../../../types';

type Props = {
  filter: Filter;
};

export default function RangeFilter({ filter }: Props) {
  const dispatch = useAppDispatch();

  const { name, unit, availableValues, values, opened } = filter;
  const min = Number(availableValues[0]);
  const max = Number(availableValues[availableValues.length - 1]);
  const from = Number(values[0]) || min;
  const to = Number(values[values.length - 1]) || max;

  return (
    <Stack>
      <Button
        onClick={() => dispatch(toggleFilter(name))}
        size='md'
        variant={from > min || to < max ? 'filled' : 'light'}
        rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
      >
        {name + (unit ? ` (${unit})` : '')}
      </Button>
      <Collapse in={opened}>
        <Stack>
          <RangeSlider
            minRange={1}
            min={min}
            max={max}
            defaultValue={[from, to]}
            onChangeEnd={value => dispatch(changeFilter({ name, values: [String(value[0]), String(value[1])] }))}
          />
          <SimpleGrid cols={2}>
            <NumberInput value={from} />
            <NumberInput value={to} />
          </SimpleGrid>
        </Stack>
      </Collapse>
    </Stack>
  );
}
