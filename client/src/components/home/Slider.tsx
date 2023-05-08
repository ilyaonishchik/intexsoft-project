import { Link } from 'react-router-dom';
import { Box, Container, createStyles, keyframes } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper';
import bannerImage from '../../assets/banner3.jpg';

type Banner = {
  id: number;
  href: string;
  imageUrl: string;
};

const banners: Banner[] = [
  {
    id: 1,
    imageUrl: bannerImage,
    href: '/',
  },
  {
    id: 2,
    imageUrl: bannerImage,
    href: '/',
  },
  {
    id: 3,
    imageUrl: bannerImage,
    href: '/',
  },
];

export const bounce = keyframes({
  'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
  '40%, 43%': { transform: 'translate3d(0, -0.5rem, 0)' },
  '70%': { transform: 'translate3d(0, -0.3rem, 0)' },
  '90%': { transform: 'translate3d(0, -0.1rem, 0)' },
});

const useStyles = createStyles(() => ({
  container: { animation: `${bounce} 5s ease-in-out infinite` },
  box: { display: 'block', position: 'relative', paddingBottom: '45%' },
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' },
}));

export default function Slider() {
  const { classes } = useStyles();

  return (
    <Container className={classes.container} size='xl' py='xl'>
      <Swiper modules={[EffectCube, Autoplay]} effect='cube' loop autoplay={{ delay: 10000 }}>
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.href}>
              <Box component={Link} to={banner.href} className={classes.box}>
                <img src={banner.imageUrl} alt='' className={classes.image} />
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
