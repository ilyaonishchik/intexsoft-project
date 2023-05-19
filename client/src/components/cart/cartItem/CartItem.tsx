import { ActionIcon, Divider, Group, Image, Paper, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { CartItem } from '../../../types';
import Quantity from './Quantity';
import { useRemoveFromCart } from '../../../hooks/swr/cart';
import { useCustomMediaQuery } from '../../../hooks/useCustomMediaQuery';

type Props = {
  cartItem: CartItem;
};

export default function CartItem({ cartItem }: Props) {
  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const { trigger, isMutating } = useRemoveFromCart(cartItem.id);

  const handleDelete = () => trigger();

  const { product } = cartItem;
  const image = cartItem.product?.images?.sort((a, b) => a.ordinal - b.ordinal)[0].image;

  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Stack>
        <Group sx={{ flexWrap: 'nowrap' }}>
          <Image src={`${import.meta.env.VITE_SERVER_URL}/${image?.name}`} width={50} height={50} fit='contain' />
          <Text size={largerThanSM ? 'lg' : 'sm'}>{product?.name}</Text>
        </Group>
        <Divider />
        <Group position='apart' spacing='xs'>
          <Text size='xl' fw={600}>
            ${product?.price}
          </Text>
          <Group>
            <Quantity cartItem={cartItem} />
            <ActionIcon onClick={handleDelete} loading={isMutating} color='red'>
              <IconTrash stroke={1} />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
