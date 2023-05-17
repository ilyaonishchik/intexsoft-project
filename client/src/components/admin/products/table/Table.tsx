import { Group, Table as MantineTable, Pagination, Select, Stack, Text } from '@mantine/core';
import { useProducts } from '../../../../hooks/swr/product/useProducts';
import { Loading, Error } from '../../../common';
import { useCustomMediaQuery } from '../../../../hooks/useCustomMediaQuery';
import { usePagination } from '../../../../hooks/usePagination';
import { useSorting } from '../../../../hooks/useSorting';
import TableItem from './TableItem';

export default function Table() {
  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const { page, setPage, take, setTake } = usePagination(1, 20);
  const { sortBy, setSortBy, order, setOrder } = useSorting('updatedAt', 'desc');

  const { error, data } = useProducts({ skip: (page - 1) * Number(take), take, sortBy, order });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products, count] = data;

  return (
    <Stack>
      <Group>
        <Group spacing='xs'>
          <Text size='sm'>Sort by:</Text>
          <Select
            data={[
              'name',
              'price',
              'quantity',
              { label: 'created', value: 'createdAt' },
              { label: 'updated', value: 'updatedAt' },
            ]}
            value={sortBy}
            onChange={value => setSortBy(value!)}
            maw={90}
            size='xs'
          />
        </Group>
        <Group spacing='xs'>
          <Text size='sm'>Order:</Text>
          <Select data={['asc', 'desc']} value={order} onChange={value => setOrder(value!)} maw={75} size='xs' />
        </Group>
      </Group>
      <MantineTable striped highlightOnHover>
        <thead>
          <tr>
            {largerThanSM && <th>ID</th>}
            <th>Name</th>
            <th>Price($)</th>
            <th>Quantity</th>
            {largerThanSM && <th>Created</th>}
            {largerThanSM && <th>Updated</th>}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <TableItem key={product.id} product={product} />
          ))}
        </tbody>
      </MantineTable>
      <Group position='center'>
        <Pagination total={Math.ceil(count / Number(take))} value={page} onChange={setPage} size='sm' />
        <Group spacing='xs'>
          <Text size='sm'>Show:</Text>
          <Select
            data={['1', '5', '10', '20']}
            value={String(take)}
            onChange={value => setTake(Number(value))}
            size='xs'
            maw={60}
          />
        </Group>
      </Group>
    </Stack>
  );
}
