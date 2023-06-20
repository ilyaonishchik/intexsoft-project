import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Button, Collapse, NumberInput, RangeSlider, SimpleGrid, Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setPrice } from '../../../redux/slices/catalogSlice';

export default function PriceFilter() {
  const dispatch = useAppDispatch();
  const price = useAppSelector(state => state.catalog.price);
  const { min, max, from, to } = price;

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Stack>
      <Button
        onClick={toggle}
        size='md'
        variant={from > min || to < max ? 'filled' : 'light'}
        rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
      >
        Price ($)
      </Button>
      <Collapse in={opened}>
        <Stack>
          <RangeSlider
            min={min}
            max={max}
            // defaultValue={[from, to]}
            // onChangeEnd={value => dispatch(setPrice({ ...price, from: value[0], to: value[1] }))}
            value={[from, to]}
            onChange={value => dispatch(setPrice({ ...price, from: value[0], to: value[1] }))}
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
