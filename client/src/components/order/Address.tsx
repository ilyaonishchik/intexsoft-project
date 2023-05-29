import { Paper, Stack, Title } from '@mantine/core';
import { Address } from '../../types';
import { AddressTable } from '../common';

type Props = {
  address: Address;
};

export default function Address({ address }: Props) {
  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Stack>
        <Title order={2}>Address</Title>
        <AddressTable address={address} />
      </Stack>
    </Paper>
  );
}
