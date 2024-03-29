import { Stack } from '@mantine/core';
import { useReviews } from '../../../hooks/swr/review/useReviews';
import { Error, Loading } from '../../common';
import Review from './Review';
import AddReview from './addReview/AddReview';

type Props = {
  productId: number;
};

export default function Reviews({ productId }: Props) {
  const { error, data } = useReviews({ productId });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [reviews] = data;

  return (
    <Stack>
      <AddReview productId={productId} />
      {reviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </Stack>
  );
}
