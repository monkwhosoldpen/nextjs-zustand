import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/mycomponents/Table';

const meta: Meta<typeof Table> = {
  title: 'MyComponents/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor' },
];

export const BasicTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSummaryRow: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
        ))}
        <TableRow className="bg-gray-50">
          <TableCell colSpan={3} className="font-medium">Total Users</TableCell>
          <TableCell className="font-medium">{sampleData.length}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Table className="border rounded-lg">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="font-bold text-gray-900">ID</TableHead>
          <TableHead className="font-bold text-gray-900">Name</TableHead>
          <TableHead className="font-bold text-gray-900">Email</TableHead>
          <TableHead className="font-bold text-gray-900">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((item, index) => (
          <TableRow key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.role === 'Admin' ? 'bg-red-100 text-red-800' :
                item.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {item.role}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const ResponsiveTable: Story = {
  render: () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2023-04-25</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Edit</button>
                  <button className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Delete</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}; 