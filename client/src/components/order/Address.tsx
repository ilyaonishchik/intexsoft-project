import { Paper, Stack, Title, Table } from '@mantine/core';
import { v4 } from 'uuid';
import { Address } from '../../types';

type Props = {
  address: Address;
};

export default function Address({ address }: Props) {
  const rows = Object.entries(address)
    .filter(item => item[0] !== 'id')
    .map(([key, value]) => (
      <tr key={v4()}>
        <th>{key}</th>
        <td>{value || '-'}</td>
      </tr>
    ));

  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Stack>
        <Title order={2}>Address</Title>
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      </Stack>
    </Paper>
  );
}
