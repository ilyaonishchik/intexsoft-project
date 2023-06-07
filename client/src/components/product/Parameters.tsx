import { Accordion, ActionIcon, Box, Flex, Popover, SimpleGrid, Text } from '@mantine/core';
import { IconPlus, IconQuestionMark } from '@tabler/icons-react';
import { ParameterCategory, ProductParameter } from '../../types';

type Props = {
  parameters: ProductParameter[];
};

const mapParameters = (
  parameters: ProductParameter[]
): { category: ParameterCategory; parameters: ProductParameter[] }[] => {
  const result: { category: ParameterCategory; parameters: ProductParameter[] }[] = [];
  parameters.forEach(parameter => {
    const { category } = parameter.parameter!;
    const resultItem = result.find(item => item.category.id === category?.id);
    if (!resultItem) result.push({ category: category!, parameters: [parameter] });
    resultItem?.parameters.push(parameter);
  });
  return result;
};

export default function Parameters({ parameters }: Props) {
  const mappedParameters = mapParameters(parameters);

  return (
    <Accordion
      multiple
      variant='separated'
      radius='md'
      chevron={<IconPlus />}
      styles={{
        chevron: {
          '&[data-rotate]': {
            transform: 'rotate(45deg)',
          },
        },
      }}
    >
      {mappedParameters
        .sort((a, b) => a.category.ordinal - b.category.ordinal)
        .map(item => (
          <Accordion.Item key={item.category.id} value={item.category.name}>
            <Accordion.Control>
              <Text fz={24} fw={700}>
                {item.category.name}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={1} breakpoints={[{ minWidth: 'sm', cols: 2 }]} spacing='xl'>
                {item.parameters
                  .sort((a, b) => a.parameter!.ordinal - b.parameter!.ordinal)
                  .map(parameter => (
                    <Flex key={parameter.id} align='center' gap='xs'>
                      <Text fz={18}>{parameter.parameter?.label}:</Text>
                      {parameter.parameter?.description && (
                        <Popover width={200}>
                          <Popover.Target>
                            <ActionIcon variant='outline' color='cyan' radius='xl' size='xs'>
                              <IconQuestionMark />
                            </ActionIcon>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <Text size='sm'>{parameter.parameter.description}</Text>
                          </Popover.Dropdown>
                        </Popover>
                      )}
                      <Box
                        sx={theme => ({
                          flex: 'auto',
                          alignSelf: 'end',
                          borderBottomWidth: 3,
                          borderBottomStyle: 'dotted',
                          borderBottomColor: theme.colors.gray[4],
                        })}
                      />
                      <Text fz={18} fw={700}>
                        {parameter.value}
                      </Text>
                    </Flex>
                  ))}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
    </Accordion>
  );
}
