import { Box, Container, Flex, Image, Stack, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Actions from './Actions';
import { useAppSelector } from '../../redux/hooks';
import { Product } from '../../types';

type Props = {
  products: Product[];
};

export default function Fixed({ products }: Props) {
  const controllers = useAppSelector(state => state.compared.controllers);
  const [scroll] = useWindowScroll();

  return (
    <Box
      sx={theme => ({
        transform: scroll.y < 500 ? 'translateY(-100%)' : 'translateY(0)',
        position: 'fixed',
        zIndex: 2,
        top: 0,
        left: 0,
        width: '100%',
        padding: theme.spacing.sm,
        background: 'white',
        boxShadow: theme.shadows.sm,
        transition: 'all 0.2s ease',
      })}
    >
      <Container size='xl'>
        <Flex gap='xl' align='center'>
          <Actions />
          <Swiper
            modules={[Navigation, Controller]}
            navigation
            controller={{ control: controllers }}
            slidesPerView='auto'
            spaceBetween={20}
            style={{ width: '100%' }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id} style={{ position: 'relative', width: 280 }}>
                <Flex align='center' gap='sm'>
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}/${product.images[0].image.name}`}
                    height={80}
                    width={80}
                    fit='contain'
                  />
                  <Stack spacing={5}>
                    <Text>{product.name}</Text>
                    <Text fw={500}>${product.price}</Text>
                  </Stack>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Container>
    </Box>
  );
}
