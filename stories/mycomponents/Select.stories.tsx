import type { Meta, StoryObj } from '@storybook/react';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from '../../components/mycomponents/Select';
import { Label } from '../../components/mycomponents/Label';

const meta: Meta<typeof Select> = {
  title: 'MyComponents/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select defaultValue="apple" {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="au">Australia</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a vehicle" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cars</SelectLabel>
          <SelectItem value="sedan">Sedan</SelectItem>
          <SelectItem value="suv">SUV</SelectItem>
          <SelectItem value="hatchback">Hatchback</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Motorcycles</SelectLabel>
          <SelectItem value="sport">Sport</SelectItem>
          <SelectItem value="cruiser">Cruiser</SelectItem>
          <SelectItem value="touring">Touring</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select disabled {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-[200px] space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select {...args}>
        <SelectTrigger id="category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="health">Health</SelectItem>
          <SelectItem value="education">Education</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  render: (args) => (
    <Select defaultValue="approved" {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected" disabled>Rejected</SelectItem>
        <SelectItem value="archived" disabled>Archived</SelectItem>
      </SelectContent>
    </Select>
  ),
}; 