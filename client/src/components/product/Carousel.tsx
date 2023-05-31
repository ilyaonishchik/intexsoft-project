import { useState } from 'react';
import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image, Box, Paper, Stack } from '@mantine/core';
import { ProductImage } from '../../types';

type Props = {
  productImages: ProductImage[];
};

export default function Carousel({ productImages }: Props) {
  const images = productImages.sort((a, b) => a.ordinal - b.ordinal).map(productImage => productImage.image);

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <Stack>
      <Box w={300} mb={20}>
        <Swiper modules={[Controller]} onSwiper={setFirstSwiper} controller={{ control: secondSwiper }}>
          {images.map(image => (
            <SwiperSlide key={image.id}>
              <Image src={`${import.meta.env.VITE_SERVER_URL}/${image.name}`} width={300} height={400} fit='contain' />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box w={300}>
        <Swiper
          modules={[Controller]}
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}
          slidesPerView={3}
        >
          {images.map(image => (
            <SwiperSlide key={image.id}>
              <Paper
                withBorder
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 70, height: 70 }}
              >
                <Image src={`${import.meta.env.VITE_SERVER_URL}/${image.name}`} width={50} height={50} fit='contain' />
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
}
