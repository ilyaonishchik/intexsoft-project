import { Button, Group, Modal, Rating, Stack, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateReview } from '../../../../hooks/swr/review/useCreateReview';

type Props = {
  productId: number;
  opened: boolean;
  close: () => void;
};

export default function AddReviewModal({ productId, opened, close }: Props) {
  const form = useForm({
    initialValues: {
      rating: 5,
      text: '',
    },
  });

  const { trigger, isMutating } = useCreateReview();

  const handleSubmit = form.onSubmit(({ rating, text }) =>
    trigger({ productId, rating, text })
      .then(() => notifications.show({ message: 'Review added successfully', color: 'green' }))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }))
      .finally(() => close())
  );

  return (
    <Modal opened={opened} onClose={close} title='Add review'>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Group>
            <Text>Rating:</Text>
            <Rating {...form.getInputProps('rating')} size='xl' />
          </Group>
          <Textarea label='Text' autosize {...form.getInputProps('text')} />
          <Button loading={isMutating} type='submit' sx={{ alignSelf: 'end' }}>
            Add
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
