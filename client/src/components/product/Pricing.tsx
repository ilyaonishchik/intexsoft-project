import { Button, Paper, Stack, Text } from '@mantine/core';

type Props = {
  price: number;
};

export default function Pricing({ price }: Props) {
  return (
    <Paper p='sm' withBorder shadow='sm'>
      <Stack align='center'>
        <Text size={30} fw={700}>
          ${price}
        </Text>
        <Button size='xl'>Add to cart</Button>
      </Stack>
    </Paper>
  );
}
