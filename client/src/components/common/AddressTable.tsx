import { useTranslation } from 'react-i18next';
import { Table } from '@mantine/core';
import { Address } from '../../types';

type Props = {
  address: Address;
};

export default function AddressTable({ address }: Props) {
  const { t } = useTranslation();

  const { country, city, house, street, zip, apartment } = address;

  return (
    <Table>
      <tbody>
        <tr>
          <th>{t('country')}</th>
          <td>{country}</td>
        </tr>
        <tr>
          <th>{t('city')}</th>
          <td>{city}</td>
        </tr>
        <tr>
          <th>{t('zip')}</th>
          <td>{zip}</td>
        </tr>
        <tr>
          <th>{t('street')}</th>
          <td>{street}</td>
        </tr>
        <tr>
          <th>{t('house')}</th>
          <td>{house}</td>
        </tr>
        <tr>
          <th>{t('apartment')}</th>
          <td>{apartment}</td>
        </tr>
      </tbody>
    </Table>
  );
}
