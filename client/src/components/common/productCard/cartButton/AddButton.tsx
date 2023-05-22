import { Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useAddToCart } from '../../../../hooks/swr/cart';

type Props = {
  productId: number;
};

export default function AddButton({ productId }: Props) {
  const { trigger, isMutating } = useAddToCart();

  const handleAdd = () => trigger({ productId, quantity: 1 });

  return (
    <Button onClick={handleAdd} loading={isMutating} leftIcon={<IconShoppingCart stroke={1} />}>
      Add to cart
    </Button>
  );
}