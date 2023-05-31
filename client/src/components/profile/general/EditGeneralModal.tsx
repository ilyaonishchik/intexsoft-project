import { useTranslation } from 'react-i18next';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { User } from '../../../types';
import { useUpdateUser } from '../../../hooks/swr/user/useUpdateUser';

type Props = {
  me: User;
  opened: boolean;
  close: () => void;
};

export default function EditGeneralModal({ me, opened, close }: Props) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      name: me.name,
      surname: me.surname,
    },
  });

  const { trigger, isMutating } = useUpdateUser();

  const handleSubmit = form.onSubmit(values => {
    trigger(values)
      .then(() => notifications.show({ message: 'User updated successfully', color: 'green' }))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }))
      .finally(() => close());
  });

  return (
    <Modal opened={opened} onClose={close} title={t('editGeneralInfo')}>
      <form onSubmit={handleSubmit}>
        <Stack spacing='xs'>
          <TextInput label={t('name')} required {...form.getInputProps('name')} />
          <TextInput label={t('surname')} required {...form.getInputProps('surname')} />
          <Button type='submit' loading={isMutating} sx={{ alignSelf: 'end' }}>
            {t('save')}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
