import { Button, Group } from '@mantine/core';
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';

export default function Actions() {
  return (
    <Group>
      <Button leftIcon={<IconShoppingCart stroke={1} />}>Add all to cart</Button>
      <Button leftIcon={<IconTrash stroke={1} />} variant='outline' color='red'>
        Clear
      </Button>
    </Group>
  );
}
