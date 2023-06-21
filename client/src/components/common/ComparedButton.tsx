import { Link } from 'react-router-dom';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconScale, IconScaleOff } from '@tabler/icons-react';
import { Loading } from '.';
import { useCompared, useToggleCompared } from '../../hooks/swr/compared';

type Props = ActionIconProps & {
  productId: number;
  iconSize?: number;
};

export default function ComparedButton({ productId, iconSize, ...props }: Props) {
  const { trigger, isMutating } = useToggleCompared();
  const { isLoading, error, data: compared } = useCompared();

  if (isLoading) return <Loading />;
  if (error)
    return (
      <ActionIcon {...props} component={Link} to='/auth' color='cyan'>
        <IconScale stroke={1} size={iconSize} />
      </ActionIcon>
    );

  const added = !!compared!.products?.find(item => item.id === productId);

  const handleToggle = () => trigger({ productId });

  return (
    <ActionIcon {...props} onClick={handleToggle} loading={isMutating} color='cyan'>
      {added ? <IconScaleOff stroke={1} size={iconSize} /> : <IconScale stroke={1} size={iconSize} />}
    </ActionIcon>
  );
}
