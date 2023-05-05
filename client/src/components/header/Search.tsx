import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function Search() {
  return (
    <TextInput
      placeholder='Search'
      variant='filled'
      rightSection={
        <ActionIcon variant='filled' color='cyan'>
          <IconSearch size='1rem' />
        </ActionIcon>
      }
    />
  );
}
