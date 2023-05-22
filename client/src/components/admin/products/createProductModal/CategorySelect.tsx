import { UseFormReturnType } from '@mantine/form';
import { Select } from '@mantine/core';
import { FormValues } from './CreateProductModal';
import { useCategories } from '../../../../hooks/swr/category/useCategories';
import { Loading, Error } from '../../../common';

type Props = {
  form: UseFormReturnType<FormValues>;
};

export default function CategorySelect({ form }: Props) {
  const { isLoading, error, data: categories } = useCategories();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <Select
      label='Category'
      data={categories!
        .filter(category => category.parent)
        .map(category => ({
          value: String(category.id),
          label: category.name,
          group: category.parent?.name,
        }))}
      {...form.getInputProps('categoryId')}
    />
  );
}
