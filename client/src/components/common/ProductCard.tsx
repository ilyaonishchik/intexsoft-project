import { ActionIcon, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconChartBar, IconHeart, IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../../types';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }} w={280} withBorder shadow='sm' radius='md'>
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
