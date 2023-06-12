import { Link } from 'react-router-dom';
import { ActionIcon, Button, Collapse, Group, Image, Paper, Stack, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useOrder } from '../../hooks/swr/order/useOrder';
import { Loading, Error } from '../common';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';

type Props = {
  orderId: number;
};

export default function Order({ orderId }: Props) {
  const largerThanXS = useCustomMediaQuery('larger', 'xs');
  const [opened, { toggle }] = useDisclosure(true);

  const { error, data: order } = useOrder(orderId);
  if (!order) return <Loading />;
  if (error) return <Error />;

  const date = new Date(order.createdAt).toLocaleDateString();

  return (
    <Paper p='md' withBorder shadow='xs'>
      <Stack>
        <Group onClick={toggle} position='apart' spacing='xl' sx={{ cursor: 'pointer' }}>
          <Group>
            <Text>{date}</Text>
            <Text>${order.amount}</Text>
          </Group>
          <ActionIcon
            variant='transparent'
            sx={{ transform: opened ? 'rotate(180deg)' : '', transition: '0.3s ease all' }}
          >
            <IconChevronDown stroke={1} />
          </ActionIcon>
        </Group>
        <Collapse in={opened}>
          <Stack>
            <Table>
              <thead>
                <tr>
                  <th>Image</th>
                  {largerThanXS && <th>Name</th>}
                  <th>Quantity</th>
                  <th>Price($)</th>
                  {largerThanXS && <th>Total($)</th>}
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Image
                        src={`${import.meta.env.VITE_SERVER_URL}/${
                          item.product?.images?.sort((a, b) => a.ordinal - b.ordinal)[0].image.name
                        }`}
                        width={50}
                        height={50}
                        fit='contain'
                      />
                    </td>
                    {largerThanXS && <td>{item.product?.name}</td>}
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    {largerThanXS && <td>{item.price * item.quantity}</td>}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button component={Link} to={`/orders/${order.id}`} sx={{ alignSelf: 'flex-end' }}>
              Show details
            </Button>
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}
