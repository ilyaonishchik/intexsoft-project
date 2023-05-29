import { Button, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useAddresses } from '../../../hooks/swr/address/useAddresses';
import { Loading, Error } from '../../common';
import Address from './Address';
import CreateAddressModal from './CreateAddressModal';

export default function Addresses() {
  const { error, data: addresses } = useAddresses();

  const [opened, { open, close }] = useDisclosure();

  if (!addresses) return <Loading />;
  if (error) return <Error />;

  return (
    <Stack>
      <Title order={2}>Addresses</Title>
      <Group>
        <Button leftIcon={<IconPlus />} onClick={open}>
          Add new address
        </Button>
        <CreateAddressModal opened={opened} close={close} />
      </Group>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'xs', cols: 2 },
          { minWidth: 'sm', cols: 3 },
          { minWidth: 'md', cols: 4 },
        ]}
      >
        {addresses.map(address => (
          <Address key={address.id} address={address} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
