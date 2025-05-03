import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../components/mycomponents/Input';

const meta: Meta<typeof Input> = {
  title: 'MyComponents/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      description: 'Type of the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    placeholder: 'Custom border color',
    className: 'border-green-500',
  },
};

export const WithMaxWidth: Story = {
  args: {
    placeholder: 'Limited width',
    className: 'max-w-xs',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    className: 'pl-8',
  },
  decorators: [
    (Story) => (
      <div className="relative">
        <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
        <Story />
      </div>
    ),
  ],
}; 