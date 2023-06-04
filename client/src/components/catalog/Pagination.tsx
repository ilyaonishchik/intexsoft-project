import { Group, Select, Text, Pagination as MantinePagination } from '@mantine/core';

type Props = {
  total: number;
  page: number;
  onPageChange: (value: number) => void;
  take: number;
  onTakeChange: (value: string | null) => void;
};

export default function Pagination({ total, page, onPageChange, take, onTakeChange }: Props) {
  return (
    <Group>
      <MantinePagination total={total} value={page} onChange={onPageChange} />
      <Group>
        <Text>Show:</Text>
        <Select data={['9']} value={String(take)} onChange={onTakeChange} maw={70} />
      </Group>
    </Group>
  );
}
