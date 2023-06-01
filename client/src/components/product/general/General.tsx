import { Stack } from '@mantine/core';
import Rating from './Rating';

type Props = {
  productId: number;
};

export default function General({ productId }: Props) {
  return (
    <Stack>
      <Rating productId={productId} />
    </Stack>
  );
}
