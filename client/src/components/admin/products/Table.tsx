import { useState } from 'react';
import { Group, Table as MantineTable, Pagination, Select, Stack, Text } from '@mantine/core';
import { useProducts } from '../../../hooks/swr/product/useProducts';
import { Loading, Error } from '../../common';
import { useCustomMediaQuery } from '../../../hooks/useCustomMediaQuery';

export default function Table() {
  const [page, setPage] = useState(1);
  const [take, setTake] = useState<string | null>('3');

  const { error, data } = useProducts({ skip: (page - 1) * Number(take), take: Number(take) });

  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products, count] = data;

  return (
    <Stack>
      <Group>
        <Group spacing='xs'>
          <Text size='sm'>Sort by:</Text>
          <Select defaultValue='created' data={['name', 'price', 'created', 'updated']} maw={90} size='xs' />
        </Group>
        <Group spacing='xs'>
          <Text size='sm'>Order:</Text>
          <Select defaultValue='desc' data={['asc', 'desc']} maw={75} size='xs' />
        </Group>
      </Group>
      <MantineTable striped>
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
            <tr key={product.id}>
              {largerThanSM && <td>{product.id}</td>}
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              {largerThanSM && <td>{new Date(product.createdAt).toLocaleDateString()}</td>}
              {largerThanSM && <td>{new Date(product.updatedAt).toLocaleDateString()}</td>}
            </tr>
          ))}
        </tbody>
      </MantineTable>
      <Group position='apart'>
        <Pagination total={Math.ceil(count / Number(take))} value={page} onChange={setPage} size='sm' />
        <Group spacing='xs'>
          <Text size='sm'>Show:</Text>
          <Select data={['1', '2', '3', '4', '5', '10']} value={take} onChange={setTake} size='xs' maw={60} />
        </Group>
      </Group>
    </Stack>
  );
}
