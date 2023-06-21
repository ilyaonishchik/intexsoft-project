import { Group, Stack } from '@mantine/core';
import Rating from './Rating';
import Variations from './Variations';
import { Product } from '../../../types';
import { ComparedButton, FavoritesButton } from '../../common';

type Props = {
  product: Product;
};

export default function General({ product }: Props) {
  return (
    <Stack spacing='xl' sx={{ alignItems: 'center' }}>
      <Group>
        <ComparedButton productId={product.id} size='xl' iconSize={35} />
        <FavoritesButton productId={product.id} size='xl' iconSize={35} />
      </Group>
      <Rating productId={product.id} />
      <Variations product={product} />
    </Stack>
  );
}
