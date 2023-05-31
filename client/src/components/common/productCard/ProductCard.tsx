import { useNavigate } from 'react-router-dom';
import { Badge, Card, Flex, Group, Image, Stack, Text, createStyles, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Product } from '../../../types';
import CartButton from './cartButton/CartButton';
import ComapredButton from './comparedButton/ComapredButton';
import FavoritesButton from './favoritesButton/FavoritesButton';

const useStyles = createStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: rem(280),
    height: '100%',
    boxShadow: theme.shadows.sm,
    borderRadius: theme.radius.md,
  },
  stack: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
    gap: theme.spacing.xs,
  },
  image: {
    cursor: 'pointer',
  },
}));

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { classes } = useStyles();
  const { id, name, price, createdAt, images } = product;

  const isNew = Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 30;

  const navigate = useNavigate();

  return (
    <Card className={classes.card} withBorder>
      <Stack className={classes.stack}>{isNew && <Badge>New</Badge>}</Stack>
      <Card.Section py='md'>
        <Carousel>
          {images
            ?.sort((a, b) => a.ordinal - b.ordinal)
            .map(image => (
              <Carousel.Slide key={image.id}>
                <Image
                  className={classes.image}
                  src={`${import.meta.env.VITE_SERVER_URL}/${image.image.name}`}
                  onClick={() => navigate(`/products/${id}`)}
                  height={200}
                  fit='contain'
                />
              </Carousel.Slide>
            ))}
        </Carousel>
      </Card.Section>
      <Flex sx={{ flex: 'auto' }} direction='column' gap='xs'>
        <Text sx={{ flex: '1 auto' }} fw={500}>
          {name}
        </Text>
        <Text fz='xl' fw={700}>
          ${price}
        </Text>
        <Group position='apart'>
          <FavoritesButton />
          <ComapredButton />
          <CartButton productId={id} />
        </Group>
      </Flex>
    </Card>
  );
}
