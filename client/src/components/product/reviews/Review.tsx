import { Avatar, Flex, Paper, Rating, Stack, Text } from '@mantine/core';
import { Review } from '../../../types';

type Props = {
  review: Review;
};

export default function Review({ review }: Props) {
  const { text, rating, user, createdAt } = review;
  const { name, surname, avatar } = user!;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <Paper p='md' withBorder shadow='sm' radius='lg'>
      <Stack>
        <Flex align='center' gap='xs'>
          <Avatar src={avatar}>{name[0].toUpperCase()}</Avatar>
          <Stack spacing={0} sx={{ flex: 'auto' }}>
            <Text>
              {name} {surname}
            </Text>
            <Rating value={rating} readOnly />
          </Stack>
          <Text color='dimmed' sx={{ alignSelf: 'start' }}>
            {date}
          </Text>
        </Flex>
        <Text>{text}</Text>
      </Stack>
    </Paper>
  );
}
