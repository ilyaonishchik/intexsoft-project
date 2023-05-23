import { ActionIcon, Flex, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { useAddresses } from '../../hooks/swr/address/useAddresses';
import { Loading, Error } from '../common';
import CreateAddressDrawer from './CreateAddressDrawer';
import { FormValues } from './Checkout';

type Props = {
  form: UseFormReturnType<FormValues>;
};

export default function AddressSelect({ form }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const { error, data: addresses } = useAddresses();
  if (!addresses) return <Loading />;
  if (error) return <Error />;

  const data = addresses.map(({ id, country, city, zip, street, house }) => ({
    value: String(id),
    label: `${country}, ${city}, ${street} ${house} (${zip})`,
  }));

  return (
    <Flex gap='sm'>
      <Select
        required
        label='Address'
        placeholder='Select address'
        data={data}
        sx={{ flex: 'auto' }}
        {...form.getInputProps('addressId')}
      />
      <ActionIcon onClick={open} variant='filled' size={36} color='cyan' sx={{ alignSelf: 'end' }}>
        <IconPlus />
      </ActionIcon>
      <CreateAddressDrawer opened={opened} close={close} />
    </Flex>
  );
}
