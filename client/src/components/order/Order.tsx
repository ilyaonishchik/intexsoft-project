import { useParams } from 'react-router-dom';
import { Container, SimpleGrid, Stack, Title } from '@mantine/core';
import { useOrder } from '../../hooks/swr/order/useOrder';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';
import { Loading, Error } from '../common';
import Recipient from './Recipient';
import Address from './Address';
import Items from './Items';
import Status from './Status';
import Bill from './Bill';

export default function Order() {
  const largerThanSM = useCustomMediaQuery('larger', 'sm');
  const { id } = useParams();

  const { error, data: order } = useOrder(Number(id));
  if (!order) return <Loading />;
  if (error) return <Error />;
  const { address, amount, name, surname, status, items } = order;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Order {id}</Title>
        <Status status={status} />
        {largerThanSM ? (
          <Stack>
            <Items items={order.items} />
            <SimpleGrid cols={3}>
              <Address address={address!} />
              <Bill amount={amount} />
              <Recipient name={name} surname={surname} />
            </SimpleGrid>
          </Stack>
        ) : (
          <Stack>
            <Items items={items} />
            <Bill amount={amount} />
            <Recipient name={name} surname={surname} />
            <Address address={address!} />
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
