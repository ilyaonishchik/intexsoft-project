import { Text } from '@mantine/core';
import { useReviews } from '../../hooks/swr/review/useReviews';
import { Loading, Error } from '../common';

type Props = {
  productId: number;
};

export default function ReviewsTab({ productId }: Props) {
  const { error, data } = useReviews({ productId });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [, count] = data;
  return <Text size='md'>Reviews ({count})</Text>;
}
