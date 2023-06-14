import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { SegmentedControl, SegmentedControlItem, Stack } from '@mantine/core';
import { useProductGroup } from '../../../hooks/swr/productGroup';
import { Parameter, Product, ProductGroup } from '../../../types';
import { Error, Loading } from '../../common';
import { useCustomMediaQuery } from '../../../hooks/custom/useCustomMediaQuery';

type Control = {
  parameter: Parameter;
  value: string;
  data: SegmentedControlItem[];
};

const createControls = (productGroup: ProductGroup, product: Product): Control[] => {
  const controls: Control[] = productGroup.parameters!.map(parameter => {
    const primaryData: SegmentedControlItem[] = productGroup.products?.map(groupProduct => ({
      label: groupProduct.parameters?.find(productParameter => productParameter.parameter?.id === parameter.id)?.value,
      value: groupProduct.id,
    }));
    const data = primaryData.filter(segmentedControlItem => {
      let isSibling = true;
      const segmentedControlItemProduct = productGroup.products?.find(item => item.id === +segmentedControlItem.value);
      const rest = productGroup.parameters?.filter(item => item.id !== parameter.id);
      rest?.forEach(item => {
        if (
          product.parameters?.find(productParameter => productParameter.parameter?.id === item.id)?.value !==
          segmentedControlItemProduct.parameters?.find(productParameter => productParameter.parameter?.id === item.id)
            ?.value
        )
          isSibling = false;
      });
      return isSibling;
    });
    return {
      parameter,
      value: String(product.id),
      data,
    };
  });
  return controls;
};

type Props = {
  product: Product;
};

export default function Variations({ product }: Props) {
  const largerThanXS = useCustomMediaQuery('larger', 'xs');
  const navigate = useNavigate();

  const { group } = product;
  if (!group) return null;

  const { error, data: productGroup } = useProductGroup(group.id);
  if (!productGroup) return <Loading />;
  if (error) return <Error />;

  const controls = createControls(productGroup, product);

  return (
    <Stack sx={{ alignItems: 'center' }}>
      {controls.map(control => (
        <SegmentedControl
          key={v4()}
          data={control.data}
          value={control.value}
          onChange={value => navigate(`/products/${value}`)}
          orientation={largerThanXS ? 'horizontal' : 'vertical'}
        />
      ))}
    </Stack>
  );
}
