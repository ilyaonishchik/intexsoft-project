import { Loading } from '../..';
import { useCart } from '../../../../hooks/swr/cart';
import RemoveButton from './RemoveButton';
import AddButton from './AddButton';
import UnauthorizedButton from './UnauthorizedButton';

type Props = {
  productId: number;
};

export default function CartButton({ productId }: Props) {
  const { isLoading, error, data: cart } = useCart();

  if (isLoading) return <Loading />;
  if (error) return <UnauthorizedButton />;

  const cartItem = cart!.items?.find(item => item.product?.id === productId);

  if (cartItem) return <RemoveButton cartItemId={cartItem.id} />;
  return <AddButton productId={productId} />;
}
