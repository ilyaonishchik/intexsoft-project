import { Button, Modal, ScrollArea, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMe } from '../../hooks/swr/auth/useMe';
import { Error, Loading } from '../common';
import AddressSelect from './AddressSelect';
import { useCreateOrder } from '../../hooks/swr/order/useCreateOrder';

export type FormValues = {
  name: string;
  surname: string;
  addressId: string;
};

export default function Checkout() {
  const [opened, { open, close }] = useDisclosure(false);

  const { trigger, isMutating } = useCreateOrder();

  const { error, data: me } = useMe();
  if (!me) return <Loading />;
  if (error) return <Error />;

  const form = useForm<FormValues>({
    initialValues: {
      name: me.name || '',
      surname: me.surname || '',
      addressId: '',
    },
    validate: {
      name: isNotEmpty('Name cannot be empty'),
      surname: isNotEmpty('Surname cannot be empty'),
    },
  });

  const handleSubmit = form.onSubmit(values => {
    trigger({ name: values.name, surname: values.surname, addressId: Number(values.addressId) })
      .then(url => window.location.replace(url!))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }))
      .finally(() => close());
  });

  return (
    <>
      <Button onClick={open} size='lg' variant='gradient' gradient={{ from: 'cyan.7', to: 'cyan.3' }}>
        Checkout
      </Button>
      <Modal opened={opened} onClose={close} title='Checkout' scrollAreaComponent={ScrollArea.Autosize}>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label='Name' withAsterisk {...form.getInputProps('name')} />
            <TextInput label='Surname' withAsterisk {...form.getInputProps('surname')} />
            <AddressSelect form={form} />
            <Button loading={isMutating} type='submit'>
              Checkout
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
