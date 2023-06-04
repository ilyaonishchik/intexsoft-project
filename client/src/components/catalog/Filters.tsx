import { Accordion, Checkbox, Group, NumberInput, RangeSlider, Stack } from '@mantine/core';

export default function Filters() {
  return (
    <Accordion defaultValue={['price']} multiple w={250}>
      <Accordion.Item value='price'>
        <Accordion.Control>Price</Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <RangeSlider />
            <Group position='apart' spacing='xs'>
              <NumberInput maw={100} />
              <NumberInput maw={100} />
            </Group>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='brand'>
        <Accordion.Control>Brand</Accordion.Control>
        <Accordion.Panel>
          <Checkbox.Group>
            <Stack>
              <Checkbox value='Apple' label='Apple (10)' />
              <Checkbox value='Xiaomi' label='Xiaomi (13)' />
              <Checkbox value='Samsung' label='Samsung' />
              <Checkbox value='POCO' label='POCO' />
              <Checkbox value='LG' label='LG' />
              <Checkbox value='HTC' label='HTC' />
            </Stack>
          </Checkbox.Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
