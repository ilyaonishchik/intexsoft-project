import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

export default function FavoritesButton() {
  return (
    <ActionIcon size='lg' color='red'>
      <IconHeart stroke={1} />
    </ActionIcon>
  );
}
