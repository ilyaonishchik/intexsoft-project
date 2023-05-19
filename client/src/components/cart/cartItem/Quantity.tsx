import { ActionIcon, Group, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useUpdateCartItem } from '../../../hooks/swr/cart/useUpdateCartItem';
import { CartItem } from '../../../types';

type Props = {
  cartItem: CartItem;
};

export default function Quantity({ cartItem }: Props) {
  const { trigger } = useUpdateCartItem(cartItem.id);

  const handleDecrement = () => trigger({ quantity: cartItem.quantity - 1 });
  const handleIncrement = () => trigger({ quantity: cartItem.quantity + 1 });

  const { product } = cartItem;

  return (
    <Group spacing='xs'>
      <ActionIcon
        onClick={handleDecrement}
        disabled={cartItem.quantity === 1}
        variant='outline'
        size='sm'
        radius='xl'
        color='cyan'
      >
        <IconMinus size={12} stroke={2} />
      </ActionIcon>
      <Text>{cartItem.quantity}</Text>
      <ActionIcon
        onClick={handleIncrement}
        disabled={cartItem.quantity === product?.quantity}
        variant='outline'
        size='sm'
        radius='xl'
        color='cyan'
      >
        <IconPlus size={12} stroke={2} />
      </ActionIcon>
    </Group>
  );
}
