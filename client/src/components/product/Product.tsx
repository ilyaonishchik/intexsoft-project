import { useParams } from 'react-router-dom';
import { Container, Stack, Tabs, Title, Text, SimpleGrid } from '@mantine/core';
import { IconChartBar, IconMessage } from '@tabler/icons-react';
import { useProduct } from '../../hooks/swr/product/useProduct';
import { Error, Loading } from '../common';
import General from './general/General';
import Reviews from './reviews/Reviews';
import Carousel from './Carousel';
import Pricing from './Pricing';
import Parameters from './Parameters';
import ReviewsTab from './ReviewsTab';

export default function Product() {
  const { id } = useParams();
  const { error, data: product } = useProduct(Number(id));

  if (!product) return <Loading />;
  if (error) return <Error />;

  const { id: productId, name, price, images, parameters } = product;

  return (
    <Container size='xl'>
      <Stack spacing='xl'>
        <Title>{name}</Title>
        <SimpleGrid breakpoints={[{ minWidth: 'md', cols: 3 }]} sx={{ alignItems: 'center', justifyItems: 'center' }}>
          <Carousel productImages={images} />
          <General product={product} />
          <Pricing price={price} productId={productId} />
        </SimpleGrid>
        <Tabs variant='pills' radius='xl' defaultValue='parameters'>
          <Tabs.List>
            <Tabs.Tab value='parameters' icon={<IconChartBar stroke='1' />}>
              <Text size='md'>Parameters</Text>
            </Tabs.Tab>
            <Tabs.Tab value='reviews' icon={<IconMessage stroke='1' />}>
              <ReviewsTab productId={product.id} />
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='parameters' mt='md'>
            <Parameters parameters={parameters} />
          </Tabs.Panel>
          <Tabs.Panel value='reviews' mt='md'>
            <Reviews productId={product.id} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
