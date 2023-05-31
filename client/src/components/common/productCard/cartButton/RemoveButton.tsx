import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useRemoveFromCart } from '../../../../hooks/swr/cart';

type Props = {
  cartItemId: number;
};

export default function RemoveButton({ cartItemId }: Props) {
  const { t } = useTranslation();

  const { trigger, isMutating } = useRemoveFromCart(cartItemId);

  const handleRemove = () => trigger();

  return (
    <Button onClick={handleRemove} loading={isMutating} leftIcon={<IconCheck />} variant='outline'>
      {t('added')}
    </Button>
  );
}
