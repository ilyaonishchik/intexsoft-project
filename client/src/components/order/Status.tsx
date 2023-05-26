import { Stepper } from '@mantine/core';
import { IconCheck, IconPackage, IconTruck } from '@tabler/icons-react';
import { OrderStatus } from '../../types';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';

type Props = {
  status: OrderStatus;
};

export default function Status({ status }: Props) {
  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const steps = [
    {
      id: 1,
      value: 'shipped',
      label: 'Shipped',
      description: 'Your order has been shipped',
      icon: <IconPackage stroke={1} />,
    },
    {
      id: 2,
      value: 'delivered',
      label: 'Delivered',
      icon: <IconTruck stroke={1} />,
      description: 'Your order delivered to destination',
    },
    {
      id: 3,
      label: 'Succeeded',
      value: 'succeeded',
      icon: <IconCheck stroke={1} />,
      description: 'Your order completed successfully',
    },
  ];

  return (
    <Stepper
      active={steps.findIndex(step => step.value === status) + 1}
      orientation={largerThanSM ? 'horizontal' : 'vertical'}
    >
      {steps.map(step => (
        <Stepper.Step key={step.id} label={step.label} description={step.description} icon={step.icon} />
      ))}
    </Stepper>
  );
}
