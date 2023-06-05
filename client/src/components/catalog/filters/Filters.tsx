import { Accordion } from '@mantine/core';
import PriceFilter from './PriceFilter';

export default function Filters() {
  return (
    <Accordion defaultValue={['price']} multiple w={288}>
      <PriceFilter />
    </Accordion>
  );
}
