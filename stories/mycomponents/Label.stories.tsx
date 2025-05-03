import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../../components/mycomponents/Label';
import { Input } from '../../components/mycomponents/Input';

const meta: Meta<typeof Label> = {
  title: 'MyComponents/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The ID of the form element the label is associated with',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
  },
};

export const WithInput: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Story />
        <Input id="email" placeholder="Enter your email" />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Story />
          <span className="text-red-500">*</span>
        </div>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>
    ),
  ],
};

export const WithCustomStyles: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username',
    className: 'text-blue-600 font-bold',
  },
};

export const WithDescription: Story = {
  args: {
    children: 'Profile Picture',
    htmlFor: 'avatar',
  },
  decorators: [
    (Story) => (
      <div className="space-y-1">
        <Story />
        <p className="text-sm text-muted-foreground">Please upload a profile picture (JPG or PNG)</p>
        <Input id="avatar" type="file" className="mt-1" />
      </div>
    ),
  ],
}; 