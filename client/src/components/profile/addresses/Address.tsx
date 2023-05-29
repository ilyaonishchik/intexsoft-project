import { ActionIcon, Group, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Address } from '../../../types';
import { AddressTable } from '../../common';
import { useDeleteAddress } from '../../../hooks/swr/address/useDeleteAddress';
import EditAddressModal from './EditAddressModal';

type Props = {
  address: Address;
};

export default function Address({ address }: Props) {
  const [opened, { open, close }] = useDisclosure();

  const { trigger, isMutating } = useDeleteAddress(address.id);
  const handleDelete = () => {
    trigger()
      .then(res => notifications.show({ message: res?.message, color: 'green' }))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }));
  };

  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Group position='right'>
        <ActionIcon onClick={open} color='cyan'>
          <IconEdit stroke={1} />
        </ActionIcon>
        <EditAddressModal address={address} opened={opened} close={close} />
        <ActionIcon onClick={handleDelete} loading={isMutating} color='red'>
          <IconTrash stroke={1} />
        </ActionIcon>
      </Group>
      <AddressTable address={address} />
    </Paper>
  );
}
