import { Group, Select, Text } from '@mantine/core';

type Props = {
  sortBy: string;
  onSortByChange: (value: string | null) => void;
  order: string;
  onOrderChange: (value: string | null) => void;
};

export default function Sorting({ sortBy, onSortByChange, order, onOrderChange }: Props) {
  return (
    <Group>
      <Group>
        <Text>Sort by:</Text>
        <Select
          data={[
            'name',
            'price',
            'quantity',
            { label: 'created', value: 'createdAt' },
            { label: 'updated', value: 'updatedAt' },
          ]}
          value={sortBy}
          onChange={onSortByChange}
          maw={105}
        />
      </Group>
      <Group>
        <Text>Order:</Text>
        <Select data={['asc', 'desc']} value={order} onChange={onOrderChange} maw={85} />
      </Group>
    </Group>
  );
}
