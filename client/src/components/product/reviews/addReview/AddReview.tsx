import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import AddReviewModal from './AddReviewModal';

type Props = {
  productId: number;
};

export default function AddReview({ productId }: Props) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Button onClick={open} leftIcon={<IconPlus />} sx={{ alignSelf: 'start' }}>
        Add review
      </Button>
      <AddReviewModal productId={productId} opened={opened} close={close} />
    </>
  );
}
