import { v4 } from 'uuid';
import { Accordion, Stack, Text } from '@mantine/core';
import { Section as SectionType } from '../Compared';
import SectionItem from './SectionItem';

type Props = {
  section: SectionType;
};

export default function Section({ section }: Props) {
  return (
    <Accordion.Item key={section.category.id} value={section.category.name}>
      <Accordion.Control>
        <Text size='xl' fw={500}>
          {section.category.name}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          {section.items.map(item => (
            <SectionItem key={v4()} sectionItem={item} />
          ))}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
