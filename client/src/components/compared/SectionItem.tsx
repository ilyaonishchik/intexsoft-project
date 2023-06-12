import { ActionIcon, Flex, Group, Popover, Text } from '@mantine/core';
import { v4 } from 'uuid';
import { IconExclamationMark } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller } from 'swiper';
import { SectionItem as SectionItemType } from './Compared';
import { useAppDispatch } from '../../redux/hooks';
import { addController } from '../../redux/slices/comparedSlice';

type Props = {
  sectionItem: SectionItemType;
};

export default function SectionItem({ sectionItem }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Flex
      key={v4()}
      sx={theme => ({
        gap: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: theme.colors.gray[2],
      })}
    >
      <Group sx={{ flexWrap: 'nowrap', minWidth: 200 }}>
        <Text sx={theme => ({ color: theme.colors.gray[8] })}>{sectionItem.parameter.label}</Text>
        {sectionItem.parameter.description && (
          <Popover width={200}>
            <Popover.Target>
              <ActionIcon variant='outline' color='cyan' radius='xl' size='xs'>
                <IconExclamationMark />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size='sm'>{sectionItem.parameter.description}</Text>
            </Popover.Dropdown>
          </Popover>
        )}
      </Group>
      <Swiper
        modules={[Controller]}
        onSwiper={swiper => dispatch(addController(swiper))}
        slidesPerView='auto'
        spaceBetween={20}
        allowTouchMove={false}
        style={{ width: '100%' }}
      >
        {sectionItem.items.map(item => {
          const maxScore = [...sectionItem.items].sort((a, b) => b.score! - a.score!)[0].score || 1;
          return (
            <SwiperSlide key={v4()} style={{ width: 280 }}>
              <Text fw={500} c={item.score === maxScore ? 'green' : 'black'}>
                {item.value}
              </Text>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
}
