import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Box, NavLink } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useCart } from '../../../hooks/swr/cart';
import { Error, Loading } from '../../common';

export default function CartLink() {
  const { t } = useTranslation();

  const { error, data: cart } = useCart();
  if (!cart) return <Loading />;
  if (error) return <Error />;
  const count = cart.items.length;

  return (
    <Box pos='relative'>
      <NavLink label={t('cart')} icon={<IconShoppingCart stroke='1' />} component={Link} to='/cart' pr={40} />
      {!!count && (
        <Badge pos='absolute' top={5} right={5} variant='filled' size='xs'>
          {count}
        </Badge>
      )}
    </Box>
  );
}
