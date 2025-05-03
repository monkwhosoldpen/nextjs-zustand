import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../components/mycomponents/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'MyComponents/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the textarea',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of visible text lines',
    }
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithRows: Story = {
  args: {
    placeholder: 'Textarea with 5 rows',
    rows: 5,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const WithCustomStyles: Story = {
  args: {
    placeholder: 'Textarea with custom styles',
    className: 'border-purple-500 focus:border-purple-700 min-h-[100px]',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This textarea contains some default text that can be edited by the user.',
    className: 'min-h-[80px]',
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea can be resized by the user',
    className: 'resize-y min-h-[60px]',
  },
}; 