import { Stack } from '@mantine/core';
import Rating from './Rating';
import Variations from './Variations';
import { Product } from '../../../types';

type Props = {
  product: Product;
};

export default function General({ product }: Props) {
  return (
    <Stack spacing='xl' sx={{ alignItems: 'center' }}>
      <Rating productId={product.id} />
      <Variations product={product} />
    </Stack>
  );
}
