import { Paper, Stack, Title, Table } from '@mantine/core';

type Props = {
  amount: number;
};

export default function Bill({ amount }: Props) {
  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Stack>
        <Title order={2}>Bill</Title>
        <Table>
          <tbody>
            <tr>
              <th>Discount</th>
              <td>0</td>
            </tr>
            <tr>
              <th>Tax</th>
              <td>0</td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>Free</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>${amount}</td>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </Paper>
  );
}
