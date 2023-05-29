import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdateAddress } from '../../../hooks/swr/address/useUpdateAddress';
import { Address } from '../../../types';

type Props = {
  address: Address;
  opened: boolean;
  close: () => void;
};

export default function EditAddressModal({ address, opened, close }: Props) {
  const form = useForm({
    initialValues: {
      country: address.country,
      city: address.city,
      zip: address.zip,
      street: address.street,
      house: address.house,
      apartment: address.apartment,
    },
  });

  const { trigger, isMutating } = useUpdateAddress(address.id);

  const handleSubmit = form.onSubmit(values => {
    trigger(values)
      .then(() => notifications.show({ message: 'Address updated successfully', color: 'green' }))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }))
      .finally(() => close());
  });

  return (
    <Modal opened={opened} onClose={close} title='Add new address'>
      <form onSubmit={handleSubmit}>
        <Stack spacing='xs'>
          <TextInput label='Country' required {...form.getInputProps('country')} />
          <TextInput label='City' required {...form.getInputProps('city')} />
          <TextInput label='Zip' required {...form.getInputProps('zip')} />
          <TextInput label='Street' required {...form.getInputProps('street')} />
          <TextInput label='House' required {...form.getInputProps('house')} />
          <TextInput label='Apartment' {...form.getInputProps('apartment')} />
          <Button type='submit' loading={isMutating} sx={{ alignSelf: 'end' }}>
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
