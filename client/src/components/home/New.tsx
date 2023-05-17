import { Container, Stack, Title, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useProducts } from '../../hooks/swr/product/useProducts';
import { Loading, Error, ProductCard } from '../common';

const useStyles = createStyles(theme => ({
  root: {
    paddingBottom: 30,
  },
  viewport: {
    padding: 10,
  },
  indicator: {
    width: 12,
    height: 6,
    backgroundColor: theme.colors.cyan[6],
    transition: 'width 250ms ease',
    '&[data-active]': {
      width: 40,
    },
  },
  indicators: {
    bottom: 10,
  },
}));

export default function New() {
  const { classes } = useStyles();

  const { error, data } = useProducts({ take: 8 });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products] = data;

  return (
    <Container size='xl'>
      <Stack>
        <Title order={2}>New</Title>
        <Carousel classNames={classes} slideSize='26%' align='start' loop withControls={false} withIndicators>
          {products?.map(product => (
            <Carousel.Slide key={product.id}>
              <ProductCard product={product} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </Container>
  );
}
