import { useTranslation } from 'react-i18next';
import { Container, Group, Stack, Title, Text } from '@mantine/core';
import { useCart } from '../../hooks/swr/cart/useCart';
import { Error, Loading } from '../common';
import CartItem from './cartItem/CartItem';
import Summary from './Summary';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';

export default function Cart() {
  const { t } = useTranslation();

  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const { error, data: cart } = useCart();
  if (!cart) return <Loading />;
  if (error) return <Error />;

  const isEmpty = !cart.items.length;

  return (
    <Container size='xl'>
      <Stack>
        <Title>{t('cart')}</Title>
        {isEmpty ? (
          <Text>{t('yourCartIsEmpty')}</Text>
        ) : (
          <>
            {!largerThanSM && <Summary cart={cart} />}
            <Group sx={{ flexWrap: 'nowrap' }}>
              <Stack sx={{ flex: '1 auto', alignSelf: 'start' }}>
                {cart.items?.map(cartItem => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
              {largerThanSM && <Summary cart={cart} />}
            </Group>
          </>
        )}
      </Stack>
    </Container>
  );
}
