import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Box, NavLink } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';
import { useCompared } from '../../../hooks/swr/compared';
import { Loading, Error } from '../../common';

export default function ComparedLink() {
  const { t } = useTranslation();

  const { error, data: compared } = useCompared();
  if (!compared) return <Loading />;
  if (error) return <Error />;
  const count = compared.products?.length;

  return (
    <Box pos='relative'>
      <NavLink label={t('compared')} icon={<IconChartBar stroke='1' />} component={Link} to='/compared' pr={40} />
      {!!count && (
        <Badge pos='absolute' top={5} right={5} variant='filled' size='xs'>
          {count}
        </Badge>
      )}
    </Box>
  );
}
