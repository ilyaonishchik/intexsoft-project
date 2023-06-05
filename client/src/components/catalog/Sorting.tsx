import { Group, Select } from '@mantine/core';

type Props = {
  sortBy: string;
  onSortByChange: (value: string | null) => void;
  order: string;
  onOrderChange: (value: string | null) => void;
};

export default function Sorting({ sortBy, onSortByChange, order, onOrderChange }: Props) {
  return (
    <Group>
      <Select
        label='Sort by:'
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
      <Select data={['asc', 'desc']} value={order} onChange={onOrderChange} maw={85} label='Order:' />
    </Group>
  );
}
