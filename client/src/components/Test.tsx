import React, { useState } from 'react';
import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Test() {
  // store controlled swiper instance
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div>
      <Swiper modules={[Controller]} controller={{ control: controlledSwiper }}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>

      <Swiper onSwiper={swiper => setControlledSwiper(swiper)}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}
