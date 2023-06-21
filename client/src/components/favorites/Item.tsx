import { Paper, Stack, Text, Image, Group, Badge, ActionIcon } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconCheck, IconShoppingCart, IconX } from '@tabler/icons-react';
import { Product } from '../../types';
import { CartButton, ComparedButton } from '../common';
import { useToggleFavorites } from '../../hooks/swr/favorites';

type Props = {
  product: Product;
};

export default function Item({ product }: Props) {
  const { id, name, price, images, quantity } = product;

  const { trigger, isMutating } = useToggleFavorites();

  return (
    <Paper pos='relative' p='md' withBorder radius='xl' shadow='sm'>
      <Group>
        <Carousel sx={{ width: 250 }}>
          {images
            ?.sort((a, b) => a.ordinal - b.ordinal)
            .map(image => (
              <Carousel.Slide key={image.id}>
                <Image src={`${import.meta.env.VITE_SERVER_URL}/${image.image.name}`} height={150} fit='contain' />
              </Carousel.Slide>
            ))}
        </Carousel>
        <Stack sx={{ flex: 'auto', alignItems: 'start' }}>
          {quantity ? (
            <Badge variant='outline'>In stock</Badge>
          ) : (
            <Badge variant='filled' color='gray'>
              Out of stock
            </Badge>
          )}
          <Text>{name}</Text>
          <Text fw={500}>${price}</Text>
          <Group>
            <ComparedButton productId={id} size='lg' />
            <CartButton productId={id} addIcon={<IconShoppingCart stroke={1} />} addedIcon={<IconCheck stroke={1} />} />
          </Group>
        </Stack>
      </Group>
      <ActionIcon
        onClick={() => trigger({ productId: product.id })}
        loading={isMutating}
        variant='transparent'
        sx={{ position: 'absolute', top: 15, right: 15 }}
      >
        <IconX />
      </ActionIcon>
    </Paper>
  );
}
