import { useTranslation } from 'react-i18next';
import { Button, Divider, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { Cart } from '../../types';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';
import Checkout from './Checkout';

type Props = {
  cart: Cart;
};

export default function Summary({ cart }: Props) {
  const { t } = useTranslation();

  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const total = cart.items?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <Paper sx={{ alignSelf: largerThanSM ? 'start' : 'auto' }} p='sm' withBorder shadow='sm'>
      <Stack spacing='xs'>
        <Group position='apart'>
          <Text>{t('discount')}:</Text>
          <Text>0%</Text>
        </Group>
        <Group position='apart'>
          <Text>{t('tax')}:</Text>
          <Text>0%</Text>
        </Group>
        <Divider />
        <Group position='apart' fw={700}>
          <Text>{t('total')}:</Text>
          <Text>${total}</Text>
        </Group>
        <Group sx={{ flexWrap: 'nowrap' }} position='apart'>
          <TextInput sx={{ flex: 'auto' }} label={t('promoCode')} />
          <Button sx={{ alignSelf: 'end' }} variant='outline'>
            {t('apply')}
          </Button>
        </Group>
        <Checkout />
      </Stack>
    </Paper>
  );
}
