import { useParams } from 'react-router-dom';
import { Container, Group, Stack, Tabs, Title } from '@mantine/core';
import { IconChartBar, IconMessage } from '@tabler/icons-react';
import Carousel from './Carousel';
import General from './General';
import Pricing from './Pricing';
import { useProduct } from '../../hooks/swr/product/useProduct';
import { Error, Loading } from '../common';

export default function Product() {
  const { id } = useParams();
  const { error, data: product } = useProduct(Number(id));

  if (!product) return <Loading />;
  if (error) return <Error />;

  const { name, price, images } = product;

  return (
    <Container size='xl'>
      <Stack>
        <Title>{name}</Title>
        <Group>
          <Carousel productImages={images} />
          <General />
          <Pricing price={price} />
        </Group>
        <Tabs variant='pills' radius='xl' defaultValue='parameters'>
          <Tabs.List>
            <Tabs.Tab value='parameters' icon={<IconChartBar stroke='1' size={16} />}>
              Parameters
            </Tabs.Tab>
            <Tabs.Tab value='reviews' icon={<IconMessage stroke='1' size={16} />}>
              Reviews
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Stack>
    </Container>
  );
}
