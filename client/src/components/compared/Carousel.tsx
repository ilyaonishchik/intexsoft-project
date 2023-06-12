import { Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import Slide from './Slide';

type Props = {
  products: Product[];
};

export default function carousel({ products }: Props) {
  const controllers = useAppSelector(state => state.compared.controllers);

  return (
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
          <Slide product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
