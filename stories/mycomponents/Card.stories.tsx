import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../components/mycomponents/Card';

const meta: Meta<typeof Card> = {
  title: 'MyComponents/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: <CardContent>Basic card content</CardContent>,
    className: 'w-[350px]',
  },
};

export const WithHeaderAndContent: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
      </>
    ),
    className: 'w-[350px]',
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has a footer section at the bottom.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700">Submit</button>
        </CardFooter>
      </>
    ),
    className: 'w-[350px]',
  },
};

export const Clickable: Story = {
  args: {
    children: (
      <CardContent>
        <p>Click this card to trigger an action.</p>
      </CardContent>
    ),
    onClick: () => alert('Card clicked'),
    className: 'w-[350px] cursor-pointer hover:shadow-md transition-shadow',
  },
};

export const CustomStyle: Story = {
  args: {
    children: (
      <>
        <CardHeader className="bg-blue-50">
          <CardTitle>Custom Styled Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has custom styling applied to it.</p>
        </CardContent>
      </>
    ),
    className: 'w-[350px] border-2 border-blue-500',
  },
}; 