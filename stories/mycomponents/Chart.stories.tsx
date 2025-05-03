import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/mycomponents/Chart';

const meta: Meta<typeof ChartContainer> = {
  title: 'MyComponents/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  args: {
    config: {
      data: {
        label: 'Monthly Sales'
      }
    },
    className: "w-[500px] border p-4 rounded-md"
  },
  render: (args) => (
    <ChartContainer {...args}>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Sales Dashboard</h3>
        <p className="text-sm text-muted-foreground">
          Showing data visualization for monthly sales performance.
        </p>
        
        {/* Mock chart visualization */}
        <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">Chart Visualization</p>
            <p className="text-sm text-muted-foreground">
              Actual chart content would be rendered here
            </p>
          </div>
        </div>
        
        {/* Mock tooltip example */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Tooltip Preview:</p>
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                active={true}
                payload={[{ value: 1250, name: 'Sales', dataKey: 'sales' }]}
                label="January"
              />
            } 
          />
        </div>
      </div>
    </ChartContainer>
  ),
};

export const WithMultipleDataPoints: Story = {
  args: {
    config: {
      data: {
        label: 'Quarterly Performance'
      }
    },
    className: "w-[500px] border p-4 rounded-md"
  },
  render: (args) => (
    <ChartContainer {...args}>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Performance Metrics</h3>
        <p className="text-sm text-muted-foreground">
          Comparing key metrics across quarterly periods.
        </p>
        
        {/* Mock visualization with data points */}
        <div className="h-[250px] bg-gray-100 rounded-md p-4">
          <div className="flex justify-between items-end h-[200px]">
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '40%' }}></div>
              <span className="text-xs mt-1">Q1</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '65%' }}></div>
              <span className="text-xs mt-1">Q2</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '80%' }}></div>
              <span className="text-xs mt-1">Q3</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '55%' }}></div>
              <span className="text-xs mt-1">Q4</span>
            </div>
          </div>
        </div>
        
        {/* Data summary */}
        <div className="grid grid-cols-4 gap-2 text-center text-sm">
          <div>
            <p className="font-medium">Q1</p>
            <p>$10,245</p>
          </div>
          <div>
            <p className="font-medium">Q2</p>
            <p>$15,790</p>
          </div>
          <div>
            <p className="font-medium">Q3</p>
            <p>$18,230</p>
          </div>
          <div>
            <p className="font-medium">Q4</p>
            <p>$14,520</p>
          </div>
        </div>
      </div>
    </ChartContainer>
  ),
};

export const WithLegend: Story = {
  args: {
    config: {
      data: {
        label: 'Product Comparison'
      }
    },
    className: "w-[500px] border p-4 rounded-md"
  },
  render: (args) => (
    <ChartContainer {...args}>
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium">Product Performance</h3>
        
        {/* Mock visualization with multiple series */}
        <div className="h-[220px] bg-gray-100 rounded-md p-4">
          <div className="flex justify-between items-end h-[180px]">
            <div className="flex flex-col items-center">
              <div className="w-16 flex flex-col space-y-1">
                <div className="bg-blue-500 rounded-t-md" style={{ height: '40px' }}></div>
                <div className="bg-green-500 rounded-t-md" style={{ height: '60px' }}></div>
              </div>
              <span className="text-xs mt-1">Product A</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 flex flex-col space-y-1">
                <div className="bg-blue-500 rounded-t-md" style={{ height: '30px' }}></div>
                <div className="bg-green-500 rounded-t-md" style={{ height: '80px' }}></div>
              </div>
              <span className="text-xs mt-1">Product B</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 flex flex-col space-y-1">
                <div className="bg-blue-500 rounded-t-md" style={{ height: '70px' }}></div>
                <div className="bg-green-500 rounded-t-md" style={{ height: '40px' }}></div>
              </div>
              <span className="text-xs mt-1">Product C</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 flex flex-col space-y-1">
                <div className="bg-blue-500 rounded-t-md" style={{ height: '50px' }}></div>
                <div className="bg-green-500 rounded-t-md" style={{ height: '50px' }}></div>
              </div>
              <span className="text-xs mt-1">Product D</span>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex space-x-4 justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-sm">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-sm">Profit</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  ),
}; 