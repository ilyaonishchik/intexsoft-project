import { Paper, Stack, Text } from '@mantine/core';
import { IconCheck, IconShoppingCart } from '@tabler/icons-react';
import { CartButton } from '../common';

type Props = {
  productId: number;
  price: number;
};

export default function Pricing({ price, productId }: Props) {
  return (
    <Paper p='md' withBorder shadow='sm' radius='xl'>
      <Stack align='center'>
        <Text size={30} fw={700}>
          ${price}
        </Text>
        <CartButton
          productId={productId}
          addIcon={<IconShoppingCart size={30} />}
          addedIcon={<IconCheck size={30} />}
          size='xl'
          radius='lg'
        />
      </Stack>
    </Paper>
  );
}
