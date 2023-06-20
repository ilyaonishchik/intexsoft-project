import { v4 } from 'uuid';
import { Button, Checkbox, Collapse, Stack } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { changeFilter, toggleFilter } from '../../../redux/slices/catalogSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { Filter } from '../../../types';

type Props = {
  filter: Filter;
};

export default function CheckFilter({ filter }: Props) {
  const dispatch = useAppDispatch();
  const { name, availableValues, values, opened } = filter;

  return (
    <Stack spacing={0}>
      <Button
        onClick={() => dispatch(toggleFilter(name))}
        size='md'
        variant={values.length ? 'filled' : 'light'}
        rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
      >
        {name}
      </Button>
      <Collapse in={opened}>
        <Checkbox.Group defaultValue={values} onChange={value => dispatch(changeFilter({ name, values: value }))}>
          <Stack p='md'>
            {[...availableValues].sort().map(value => (
              <Checkbox key={v4()} label={value} value={value} />
            ))}
          </Stack>
        </Checkbox.Group>
      </Collapse>
    </Stack>
  );
}
