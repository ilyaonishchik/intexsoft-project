import { Group, Rating as MantineRating, Text } from '@mantine/core';
import { useReviews } from '../../../hooks/swr/review/useReviews';
import { Loading, Error } from '../../common';

type Props = {
  productId: number;
};

export default function Rating({ productId }: Props) {
  const { error, data } = useReviews({ productId });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [reviews, count] = data;

  const ratingSum = reviews.map(review => review.rating).reduce((previous, current) => previous + current, 0);
  const averageRating = count ? ratingSum / count : 5;

  return (
    <Group>
      <MantineRating value={averageRating} fractions={4} readOnly />
      <Text>({count})</Text>
    </Group>
  );
}
