import React from 'react';
import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    viewMode: 'docs',
    previewTabs: { 
      canvas: { hidden: true } 
    },
  },
};

export default meta;

export const Introduction = () => {
  return (
    <div className="sb-doc p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Custom Components Library</h1>
      
      <p className="mb-4">
        This is a collection of custom UI components built for the dashboard project. 
        These components are designed to replace the shadcn UI components with our own 
        implementations while maintaining the same API and design aesthetic.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">Components</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Button</strong> - A standard button component with various styles and sizes</li>
        <li><strong>Badge</strong> - A visual indicator for statuses, categories, or tags</li>
        <li><strong>Card</strong> - A container component with several composable sub-components</li>
        <li><strong>Separator</strong> - A simple component for creating visual separations</li>
        <li><strong>Table</strong> - A fully-featured table system with headers, rows, and cells</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">Usage</h2>
      <p className="mb-2">
        Each component maintains the same props and API as their shadcn UI counterparts, 
        making them easy to swap in your existing codebase. Import them from the 
        <code className="bg-gray-100 px-1 rounded">@/components/mycomponents</code> directory 
        instead of <code className="bg-gray-100 px-1 rounded">@/components/ui</code>.
      </p>

      <div className="bg-gray-100 p-4 rounded mb-4 font-mono text-sm">
        <div>// Before</div>
        <div>import {'{'} Button {'}'} from "@/components/ui/button";</div>
        <div className="mt-4">// After</div>
        <div>import {'{'} Button {'}'} from "@/components/mycomponents/Button";</div>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-2">Goals</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li><strong>Identical API</strong> - Keep the same props and component structure</li>
        <li><strong>Simplified Implementation</strong> - Plain HTML/CSS/JS implementations</li>
        <li><strong>Consistent Styling</strong> - Match the styling of the original components</li>
        <li><strong>Tailwind Integration</strong> - Utilize Tailwind for styling</li>
      </ol>
    </div>
  );
}; 