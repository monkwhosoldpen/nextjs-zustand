import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/mycomponents/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'MyComponents/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default selected tab',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Make changes to your account settings here.
        </p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Change your password here.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Make changes to your account settings here.
        </p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Change your password here.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const CustomWidth: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-[600px]" {...args}>
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
        <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground mt-1">
          This tab has a custom width and the triggers are evenly spaced.
        </p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Change your password here.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
}; 