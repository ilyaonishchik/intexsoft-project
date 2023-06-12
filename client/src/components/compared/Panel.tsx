import { Accordion, Flex, Stack } from '@mantine/core';
import Actions from './Actions';
import Carousel from './Carousel';
import { Tab } from '../Compared';
import Section from './Section';

type Props = {
  tab: Tab;
};

export default function Panel({ tab }: Props) {
  return (
    <Stack>
      <Flex gap='xl'>
        <Actions />
        <Carousel products={tab.products} />
      </Flex>
      <Accordion
        multiple
        defaultValue={tab.sections.map(item => item.category.name)}
        variant='separated'
        radius='md'
        styles={{ content: { paddingRight: 0 } }}
      >
        {tab.sections.map(section => (
          <Section key={section.category.id} section={section} />
        ))}
      </Accordion>
    </Stack>
  );
}
