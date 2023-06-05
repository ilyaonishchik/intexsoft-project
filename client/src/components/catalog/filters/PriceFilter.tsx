import { Accordion, NumberInput, RangeSlider, SimpleGrid, Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setPrice } from '../../../redux/slices/catalogSlice';

export default function PriceFilter() {
  const price = useAppSelector(state => state.catalog.price);
  const { min, max, from, to } = price;
  const dispatch = useAppDispatch();

  return (
    <Accordion.Item value='price'>
      <Accordion.Control>Price ($)</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <RangeSlider
            min={min}
            max={max}
            defaultValue={[from, to]}
            onChangeEnd={value => dispatch(setPrice({ ...price, from: value[0], to: value[1] }))}
          />
          <SimpleGrid cols={2}>
            <NumberInput value={from} />
            <NumberInput value={to} />
          </SimpleGrid>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
