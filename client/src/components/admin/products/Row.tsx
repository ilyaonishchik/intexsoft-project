import { Menu } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../../hooks/custom/useCustomMediaQuery';
import { useDeleteProduct } from '../../../hooks/swr/product/useDeleteProduct';
import { Product } from '../../../types';

type Props = {
  product: Product;
};

export default function Row({ product }: Props) {
  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const { trigger } = useDeleteProduct(product.id);

  const handleDelete = () => {
    trigger()
      .then(res => notifications.show({ message: res?.message, color: 'green' }))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }));
  };

  return (
    <Menu>
      <Menu.Target>
        <tr style={{ cursor: 'pointer' }}>
          {largerThanSM && <td>{product.id}</td>}
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          {largerThanSM && <td>{new Date(product.createdAt).toLocaleDateString()}</td>}
          {largerThanSM && <td>{new Date(product.updatedAt).toLocaleDateString()}</td>}
        </tr>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Show in catalog</Menu.Item>
        <Menu.Item onClick={handleDelete} icon={<IconTrash stroke={1} size={20} />} color='red'>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
