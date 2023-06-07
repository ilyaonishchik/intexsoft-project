import { useParams } from 'react-router-dom';
import { Container, Group, Stack, Tabs, Title, Text } from '@mantine/core';
import { IconChartBar, IconMessage } from '@tabler/icons-react';
import { useProduct } from '../../hooks/swr/product/useProduct';
import { Error, Loading } from '../common';
import Carousel from './Carousel';
import General from './general/General';
import Pricing from './Pricing';
import Reviews from './reviews/Reviews';
import Parameters from './Parameters';
import ReviewsTab from './ReviewsTab';

export default function Product() {
  const { id } = useParams();
  const { error, data: product } = useProduct(Number(id));

  if (!product) return <Loading />;
  if (error) return <Error />;

  const { name, price, images, parameters } = product;

  return (
    <Container size='xl'>
      <Stack>
        <Title>{name}</Title>
        <Group position='apart'>
          <Carousel productImages={images} />
          <General productId={product.id} />
          <Pricing price={price} />
        </Group>
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
