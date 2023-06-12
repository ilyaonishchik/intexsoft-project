import { Link } from 'react-router-dom';
import { ActionIcon } from '@mantine/core';
import { IconChartBar, IconScale, IconScaleOff } from '@tabler/icons-react';
import { useCompared, useToggleCompared } from '../../../hooks/swr/compared';
import { Loading } from '..';

type Props = {
  productId: number;
};

export default function ComparedButton({ productId }: Props) {
  const { trigger, isMutating } = useToggleCompared();
  const { error, data: compared } = useCompared();

  if (!compared) return <Loading />;
  if (error)
    return (
      <ActionIcon component={Link} to='/auth' size='lg' color='cyan'>
        <IconChartBar stroke={1} />
      </ActionIcon>
    );

  const added = !!compared.products?.find(item => item.id === productId);

  const onToggle = () => trigger({ productId });

  return (
    <ActionIcon onClick={onToggle} loading={isMutating} size='lg' color='cyan'>
      {added ? <IconScaleOff stroke={1} /> : <IconScale stroke={1} />}
    </ActionIcon>
  );
}
