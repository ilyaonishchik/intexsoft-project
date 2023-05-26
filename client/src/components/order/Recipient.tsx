import { Paper, Stack, Title, Table } from '@mantine/core';

type Props = {
  name: string;
  surname: string;
};

export default function Recipient({ name, surname }: Props) {
  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Stack spacing='xs'>
        <Title order={2}>Recipient</Title>
        <Table>
          <tbody>
            <tr>
              <th>name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>surname</th>
              <td>{surname}</td>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </Paper>
  );
}
