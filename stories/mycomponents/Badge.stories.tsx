import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../components/mycomponents/Badge';

const meta: Meta<typeof Badge> = {
  title: 'MyComponents/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'outline'],
      description: 'The visual style of the badge',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Badge',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Badge',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Clickable Badge',
    onClick: () => alert('Badge clicked'),
  },
};

export const CustomColor: Story = {
  args: {
    children: 'Custom Color Badge',
    className: 'bg-blue-500 text-white',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="mr-1">🏷️</span>
        Badge with Icon
      </>
    ),
  },
}; 