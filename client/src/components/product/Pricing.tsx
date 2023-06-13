import { Button, Paper, Stack, Text } from '@mantine/core';

type Props = {
  price: number;
};

export default function Pricing({ price }: Props) {
  return (
    <Paper p='md' withBorder shadow='sm' radius='xl'>
      <Stack align='center'>
        <Text size={30} fw={700}>
          ${price}
        </Text>
        <Button size='xl' radius='lg'>
          Add to cart
        </Button>
      </Stack>
    </Paper>
  );
}
