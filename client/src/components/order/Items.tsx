import { Paper, Stack, Table, Title, Image, Sx } from '@mantine/core';
import { OrderItem } from '../../types';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';

type Props = {
  items: OrderItem[];
  sx?: Sx;
};

export default function Items({ items, sx }: Props) {
  const largerThanXS = useCustomMediaQuery('larger', 'xs');

  return (
    <Paper p='sm' withBorder shadow='sm' sx={sx}>
      <Stack>
        <Title order={2}>Items</Title>
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
            {items.map(item => (
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
      </Stack>
    </Paper>
  );
}
