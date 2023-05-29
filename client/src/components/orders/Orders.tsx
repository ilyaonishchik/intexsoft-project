import { useState } from 'react';
import { Container, Group, Pagination, Stack, Title, Text, Select } from '@mantine/core';
import { useOrders } from '../../hooks/swr/order/useOrders';
import { Loading, Error } from '../common';
import Order from './Order';
import { usePagination } from '../../hooks/custom/usePagination';
import { OrderStatus } from '../../types';

export default function Orders() {
  const { page, setPage, take } = usePagination(1, 20);
  const [status, setStatus] = useState<OrderStatus>('succeeded');

  const { error, data } = useOrders({ take: 10, status });
  if (!data) return <Loading />;
  if (error) return <Error />;

  const [orders, count] = data;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Orders</Title>
        <Group>
          <Text>Status:</Text>
          <Select
            data={['pending', 'shipped', 'delivered', 'succeeded', 'canceled']}
            value={status}
            onChange={setStatus}
          />
        </Group>
        {orders.length ? (
          <Stack>
            {orders.map(order => (
              <Order key={order.id} orderId={order.id} />
            ))}
          </Stack>
        ) : (
          <Text>No {status} orders</Text>
        )}

        <div>
          <Pagination total={Math.ceil(count / Number(take))} value={page} onChange={setPage} size='sm' />
        </div>
      </Stack>
    </Container>
  );
}
