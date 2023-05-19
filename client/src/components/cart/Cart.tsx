import { Container, Group, Stack, Title } from '@mantine/core';
import { useCart } from '../../hooks/swr/cart/useCart';
import { Error, Loading } from '../common';
import CartItem from './cartItem/CartItem';
import Summary from './Summary';
import { useCustomMediaQuery } from '../../hooks/useCustomMediaQuery';

export default function Cart() {
  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const { error, data: cart } = useCart();
  if (!cart) return <Loading />;
  if (error) return <Error />;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Cart</Title>
        {!largerThanSM && <Summary cart={cart} />}
        <Group sx={{ flexWrap: 'nowrap' }}>
          <Stack sx={{ flex: '1 auto' }}>
            {cart.items?.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </Stack>
          {largerThanSM && <Summary cart={cart} />}
        </Group>
      </Stack>
    </Container>
  );
}
