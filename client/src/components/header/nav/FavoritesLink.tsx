import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Box, NavLink } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useFavorites } from '../../../hooks/swr/favorites';
import { Error, Loading } from '../../common';

export default function FavoritesLink() {
  const { t } = useTranslation();

  const { isLoading, error, data: favorites } = useFavorites();
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  const count = favorites!.products?.length;

  return (
    <Box pos='relative'>
      <NavLink label={t('favorites')} icon={<IconHeart stroke='1' />} component={Link} to='/favorites' pr={40} />
      {!!count && (
        <Badge pos='absolute' top={5} right={5} variant='filled' size='xs'>
          {count}
        </Badge>
      )}
    </Box>
  );
}
