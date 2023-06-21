import { Link } from 'react-router-dom';
import { Button, ButtonProps } from '@mantine/core';
import { useCart, useToggleCart } from '../../hooks/swr/cart';
import { Loading } from '.';

type Props = ButtonProps & {
  productId: number;
  addedIcon: JSX.Element;
  addIcon: JSX.Element;
};

export default function CartButton({ productId, addIcon, addedIcon, ...props }: Props) {
  const { trigger, isMutating } = useToggleCart();

  const { isLoading, error, data: cart } = useCart();
  if (isLoading) return <Loading />;
  if (error)
    return (
      <Button {...props} component={Link} to='/auth' leftIcon={addIcon}>
        Add to cart
      </Button>
    );
  const cartItem = cart!.items?.find(item => item.product?.id === productId);

  return (
    <Button
      {...props}
      onClick={() => trigger({ productId })}
      loading={isMutating}
      variant={cartItem ? 'outline' : 'filled'}
      leftIcon={cartItem ? addedIcon : addIcon}
    >
      {cartItem ? 'Added' : 'Add to cart'}
    </Button>
  );
}
