import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../../components/mycomponents/Separator';

const meta: Meta<typeof Separator> = {
  title: 'MyComponents/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div>
        <h4 className="text-lg font-medium">Content Above</h4>
        <p className="text-sm text-gray-500">This content is above the separator</p>
      </div>
      <Separator {...args} />
      <div>
        <h4 className="text-lg font-medium">Content Below</h4>
        <p className="text-sm text-gray-500">This content is below the separator</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-full max-w-md mx-auto flex h-[100px]">
      <div>
        <h4 className="text-lg font-medium">Left Content</h4>
        <p className="text-sm text-gray-500">Content on the left</p>
      </div>
      <Separator {...args} className="mx-4" />
      <div>
        <h4 className="text-lg font-medium">Right Content</h4>
        <p className="text-sm text-gray-500">Content on the right</p>
      </div>
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    orientation: 'horizontal',
    className: 'bg-blue-500 h-[2px]'
  },
  render: (args) => (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div>
        <h4 className="text-lg font-medium">Custom Styled Separator</h4>
        <p className="text-sm text-gray-500">This separator has custom styling</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="text-sm text-gray-500">Content below the custom separator</p>
      </div>
    </div>
  ),
}; 