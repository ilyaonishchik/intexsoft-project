import { Button, Drawer, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useCreateAddress } from '../../hooks/swr/address/useCreateAddress';

type Props = {
  opened: boolean;
  close: () => void;
};

export default function CreateAddressDrawer({ opened, close }: Props) {
  const form = useForm({
    initialValues: {
      country: '',
      city: '',
      zip: '',
      street: '',
      house: '',
      apartment: '',
    },
  });

  const { trigger, isMutating } = useCreateAddress();

  const handleSubmit = form.onSubmit(values => {
    trigger(values)
      .then(() => notifications.show({ message: 'Address created successfully', color: 'green' }))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }))
      .finally(() => close());
  });

  return (
    <Drawer opened={opened} onClose={close} title='Add new address' size='xs' overlayProps={{ opacity: 0.2 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing='xs'>
          <TextInput label='Country' required {...form.getInputProps('country')} />
          <TextInput label='City' required {...form.getInputProps('city')} />
          <TextInput label='Zip' required {...form.getInputProps('zip')} />
          <TextInput label='Street' required {...form.getInputProps('street')} />
          <TextInput label='House' required {...form.getInputProps('house')} />
          <TextInput label='Apartment' {...form.getInputProps('apartment')} />
          <Button type='submit' loading={isMutating} sx={{ alignSelf: 'end' }}>
            Add
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
}
