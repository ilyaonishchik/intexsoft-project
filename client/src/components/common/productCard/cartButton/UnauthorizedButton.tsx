import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function UnauthorizedButton() {
  const { t } = useTranslation();

  return (
    <Button component={Link} to='/auth' leftIcon={<IconShoppingCart stroke={1} />}>
      {t('addToCart')}
    </Button>
  );
}
