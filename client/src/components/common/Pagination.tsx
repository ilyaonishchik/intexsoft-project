import { Group, Select, Text, Pagination as MantinePagination, SelectItem } from '@mantine/core';

type Props = {
  total: number;
  page: number;
  onPageChange: (value: number) => void;
  takeData?: (string | SelectItem)[];
  take: number;
  onTakeChange: (value: string | null) => void;
};

export default function Pagination({ total, page, onPageChange, takeData, take, onTakeChange }: Props) {
  return (
    <Group position='center'>
      <MantinePagination total={total} value={page} onChange={onPageChange} />
      <Group>
        <Text>Show:</Text>
        <Select data={takeData || ['10']} value={String(take)} onChange={onTakeChange} maw={70} />
      </Group>
    </Group>
  );
}
