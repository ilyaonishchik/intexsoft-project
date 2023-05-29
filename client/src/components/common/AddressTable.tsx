import { Table } from '@mantine/core';
import { v4 } from 'uuid';
import { Address } from '../../types';

type Props = {
  address: Address;
};

export default function AddressTable({ address }: Props) {
  const rows = Object.entries(address)
    .filter(item => item[0] !== 'id')
    .map(([key, value]) => (
      <tr key={v4()}>
        <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
        <td>{value || '-'}</td>
      </tr>
    ));

  return (
    <Table>
      <tbody>{rows}</tbody>
    </Table>
  );
}
