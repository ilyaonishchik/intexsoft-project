import { useNavigate } from 'react-router-dom';
import { Badge, Card, Flex, Group, Image, Stack, Text, createStyles, Rating } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Product } from '../../../types';
import CartButton from './cartButton/CartButton';
import ComparedButton from './ComparedButton';
import FavoritesButton from './FavoritesButton';

const useStyles = createStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 280,
    // height: '100%',
    boxShadow: theme.shadows.sm,
    borderRadius: theme.radius.md,
  },
  stack: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 10,
    gap: theme.spacing.xs,
  },
  image: {
    cursor: 'pointer',
  },
  name: {
    display: '-webkit-box',
    height: 50,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
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
      <Stack spacing='xs'>
        <Text className={classes.name}>{name}</Text>
        <Rating value={5} readOnly size='xs' />
        <Text fz='xl' fw={700}>
          ${price}
        </Text>
        <Group position='apart'>
          <FavoritesButton />
          <ComparedButton productId={id} />
          <CartButton productId={id} />
        </Group>
      </Stack>
    </Card>
  );
}
