import { Error, Loading } from '../..';
import { useCart } from '../../../../hooks/swr/cart';
import RemoveButton from './RemoveButton';
import AddButton from './AddButton';

type Props = {
  productId: number;
};

export default function CartButton({ productId }: Props) {
  const { error, data: cart } = useCart();

  if (!cart) return <Loading />;
  if (error) return <Error />;

  const cartItem = cart.items?.find(item => item.product?.id === productId);

  if (cartItem) return <RemoveButton cartItemId={cartItem.id} />;
  return <AddButton productId={productId} />;
}
