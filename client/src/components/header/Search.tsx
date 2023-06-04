import { useTranslation } from 'react-i18next';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function Search() {
  const { t } = useTranslation();

  return (
    <TextInput
      placeholder={t('search') || 'Search'}
      variant='filled'
      rightSection={
        <ActionIcon variant='filled' color='cyan'>
          <IconSearch size='1rem' />
        </ActionIcon>
      }
    />
  );
}
