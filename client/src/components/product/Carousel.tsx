import { Stack, Image } from '@mantine/core';
import { Carousel as MantineCarousel } from '@mantine/carousel';
import { ProductImage } from '../../types';

type Props = {
  productImages: ProductImage[];
};

export default function Carousel({ productImages }: Props) {
  const images = productImages.sort((a, b) => a.ordinal - b.ordinal).map(productImage => productImage.image);

  return (
    <Stack>
      <MantineCarousel>
        {images.map(image => (
          <MantineCarousel.Slide key={image.id}>
            <Image src={`${import.meta.env.VITE_SERVER_URL}/${image.name}`} height={300} fit='contain' />
          </MantineCarousel.Slide>
        ))}
      </MantineCarousel>
      <MantineCarousel slideSize='30%'>
        {images.map(image => (
          <MantineCarousel.Slide key={image.id}>
            <Image src={`${import.meta.env.VITE_SERVER_URL}/${image.name}`} height={100} fit='contain' />
          </MantineCarousel.Slide>
        ))}
      </MantineCarousel>
    </Stack>
  );
}
