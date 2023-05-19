import { Badge, Card, Flex, Group, Image, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Product } from '../../../types';
import CartButton from './cartButton/CartButton';
import ComapredButton from './comparedButton/ComapredButton';
import FavoritesButton from './favoritesButton/FavoritesButton';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

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
          <FavoritesButton />
          <ComapredButton />
          <CartButton productId={product.id} />
        </Group>
      </Flex>
    </Card>
  );
}
