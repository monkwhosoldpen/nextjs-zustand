import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '../../components/mycomponents/RadioGroup';
import { Label } from '../../components/mycomponents/Label';

const meta: Meta<typeof RadioGroup> = {
  title: 'MyComponents/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r-option-1" />
        <Label htmlFor="r-option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r-option-2" disabled />
        <Label htmlFor="r-option-2" className="text-muted-foreground">Option 2 (Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r-option-3" />
        <Label htmlFor="r-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" className="space-y-2" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="v-option-1" />
        <Label htmlFor="v-option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="v-option-2" />
        <Label htmlFor="v-option-2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="v-option-3" />
        <Label htmlFor="v-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" className="flex space-x-4" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="h-option-1" />
        <Label htmlFor="h-option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="h-option-2" />
        <Label htmlFor="h-option-2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="h-option-3" />
        <Label htmlFor="h-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}; 