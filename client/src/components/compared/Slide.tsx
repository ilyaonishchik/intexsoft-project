import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Product } from '../../types';
import { ProductCard } from '../common';
import { useToggleCompared } from '../../hooks/swr/compared';

type Props = {
  product: Product;
};

export default function Slide({ product }: Props) {
  const { trigger, isMutating } = useToggleCompared();

  return (
    <>
      <ProductCard product={product} />
      <ActionIcon
        onClick={() => trigger({ productId: product.id })}
        loading={isMutating}
        variant='transparent'
        sx={{ position: 'absolute', top: 5, right: 5 }}
      >
        <IconX />
      </ActionIcon>
    </>
  );
}
