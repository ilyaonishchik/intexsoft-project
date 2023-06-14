import { v4 } from 'uuid';
import { Accordion, Stack, Text } from '@mantine/core';
import { Section as SectionType } from './Compared';
import SectionItem from './SectionItem';
import { useAppSelector } from '../../redux/hooks';

type Props = {
  section: SectionType;
};

export default function Section({ section }: Props) {
  const { category, items } = section;
  const filter = useAppSelector(state => state.compared.filter);
  const filteredItems = items.filter(sectionItem => {
    switch (filter) {
      case 'Differences':
        return !sectionItem.items.every((item, _, array) => item.value === array[0].value);
      case 'Matches':
        return sectionItem.items.every((item, _, array) => item.value === array[0].value);
      default:
        return true;
    }
  });

  if (!filteredItems.length) return null;

  return (
    <Accordion.Item key={category.id} value={category.name}>
      <Accordion.Control>
        <Text size='xl' fw={500}>
          {category.name}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          {filteredItems.map(item => (
            <SectionItem key={v4()} sectionItem={item} />
          ))}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
