import { useTranslation } from 'react-i18next';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateAddress } from '../../../hooks/swr/address/useCreateAddress';

type Props = {
  opened: boolean;
  close: () => void;
};

export default function CreateAddressModal({ opened, close }: Props) {
  const { t } = useTranslation();

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
    <Modal opened={opened} onClose={close} title={t('addNewAddress')}>
      <form onSubmit={handleSubmit}>
        <Stack spacing='xs'>
          <TextInput label={t('country')} required {...form.getInputProps('country')} />
          <TextInput label={t('city')} required {...form.getInputProps('city')} />
          <TextInput label={t('zip')} required {...form.getInputProps('zip')} />
          <TextInput label={t('street')} required {...form.getInputProps('street')} />
          <TextInput label={t('house')} required {...form.getInputProps('house')} />
          <TextInput label={t('apartment')} {...form.getInputProps('apartment')} />
          <Button type='submit' loading={isMutating} sx={{ alignSelf: 'end' }}>
            {t('add')}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
