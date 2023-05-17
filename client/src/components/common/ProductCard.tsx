import { ActionIcon, Badge, Button, Card, Flex, Group, Image, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconChartBar, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../../types';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 3;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }} w={280} h='100%' withBorder shadow='sm' radius='md'>
      <Stack
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
        }}
        spacing='xs'
      >
        {isNew && <Badge>New</Badge>}
      </Stack>
      <Card.Section py='md'>
        <Carousel>
          {product.images
            ?.sort((a, b) => a.ordinal - b.ordinal)
            .map(image => (
              <Carousel.Slide key={image.id}>
                <Image src={`${import.meta.env.VITE_SERVER_URL}/${image.image.name}`} height={200} fit='contain' />
              </Carousel.Slide>
            ))}
        </Carousel>
      </Card.Section>
      <Flex sx={{ flex: 'auto' }} direction='column' gap='xs'>
        <Text sx={{ flex: '1 auto' }} fw={500}>
          {product.name}
        </Text>
        <Text fz='xl' fw={700}>
          ${product.price}
        </Text>
        <Group position='apart'>
          <ActionIcon size='lg' color='red'>
            <IconHeart stroke={1} />
          </ActionIcon>
          <ActionIcon size='lg' color='cyan'>
            <IconChartBar stroke={1} />
          </ActionIcon>
          <Button leftIcon={<IconShoppingCart stroke={1} />}>Add to cart</Button>
        </Group>
      </Flex>
    </Card>
  );
}
