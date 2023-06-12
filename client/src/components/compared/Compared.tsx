import { Container, Group, Stack, Tabs, Title, Text } from '@mantine/core';
import { useCompared } from '../../hooks/swr/compared';
import { Error, Loading } from '../common';
import { Category, Parameter, ParameterCategory, Product, ProductParameter } from '../../types';
import Panel from './Panel';
import { useAppDispatch } from '../../redux/hooks';
import { setActiveTab } from '../../redux/slices/comparedSlice';

export type SectionItem = {
  parameter: Parameter;
  items: Pick<ProductParameter, 'value' | 'score'>[];
};

export type Section = {
  category: ParameterCategory;
  items: SectionItem[];
};

export type Tab = {
  category: Category;
  products: Product[];
  sections: Section[];
};

const mapProductsToTabs = (products: Product[]): Tab[] => {
  const tabs: Tab[] = products
    .map(product => product.category)
    .filter((category, index, array) => index === array.findIndex(item => item?.id === category?.id))
    .map(category => ({ category, products: [], sections: [] }));
  tabs.forEach(tab => {
    tab.products = products.filter(product => product.category?.id === tab.category.id);
    const allParameters: Parameter[] = [];
    tab.products.forEach(product => {
      product.parameters?.forEach(productParameter => allParameters.push(productParameter.parameter!));
    });
    const uniqueParameters = allParameters.filter(
      (parameter, index, array) => index === array.findIndex(item => item.id === parameter.id)
    );
    const uniqueCategories = uniqueParameters
      .map(parameter => parameter.category)
      .filter((category, index, array) => index === array.findIndex(item => item?.id === category?.id));
    const sections: Section[] = uniqueCategories.map(category => ({
      category,
      items: uniqueParameters
        .filter(parameter => parameter.category?.id === category?.id)
        .map(parameter => ({
          parameter,
          items: tab.products.map(product => {
            const productParameter = product.parameters?.find(item => item.parameter?.id === parameter.id);
            return productParameter
              ? { value: productParameter.value, score: productParameter.score }
              : { value: '-', score: 0 };
          }),
        })),
    }));
    tab.sections = sections;
  });
  return tabs;
};

export default function Compared() {
  const dispatch = useAppDispatch();

  const { error, data: compared } = useCompared();

  if (!compared) return <Loading />;
  if (error) return <Error />;
  const tabs = mapProductsToTabs(compared.products!);
  const activeTab = tabs[0].category.name;
  dispatch(setActiveTab(activeTab));

  return (
    <Container size='xl'>
      <Stack>
        <Title>Compared</Title>
        {compared.products?.length ? (
          <Tabs defaultValue={activeTab} onTabChange={value => dispatch(setActiveTab(value!))}>
            <Tabs.List>
              {tabs.map(({ category, products }) => (
                <Tabs.Tab key={category.id} value={category.name}>
                  <Group>
                    <Text>{category.name}</Text>
                    <Text c='gray' fw={700}>
                      {products.length}
                    </Text>
                  </Group>
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {tabs.map(tab => (
              <Tabs.Panel key={tab.category.id} value={tab.category.name} py='xl'>
                <Panel tab={tab} />
              </Tabs.Panel>
            ))}
          </Tabs>
        ) : (
          <Text>Nothing to compare:(</Text>
        )}
      </Stack>
    </Container>
  );
}
