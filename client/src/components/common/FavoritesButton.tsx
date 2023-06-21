import { Link } from 'react-router-dom';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useFavorites, useToggleFavorites } from '../../hooks/swr/favorites';
import { Loading } from '.';

type Props = ActionIconProps & {
  productId: number;
  iconSize?: number;
};

export default function FavoritesButton({ productId, iconSize, ...props }: Props) {
  const { trigger, isMutating } = useToggleFavorites();
  const { isLoading, error, data: favorites } = useFavorites();

  if (isLoading) return <Loading />;
  if (error)
    return (
      <ActionIcon {...props} component={Link} to='/auth' color='cyan'>
        <IconHeart stroke={1} size={iconSize} />
      </ActionIcon>
    );

  const added = !!favorites!.products?.find(item => item.id === productId);

  const handleToggle = () => trigger({ productId });

  return (
    <ActionIcon {...props} onClick={handleToggle} loading={isMutating} color='red'>
      {added ? <IconHeartFilled stroke={1} size={iconSize} /> : <IconHeart stroke={1} size={iconSize} />}
    </ActionIcon>
  );
}
