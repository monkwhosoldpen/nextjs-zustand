import type { Preview } from '@storybook/react'
import '../app/globals.css'; // Include global styles
import React, { Suspense } from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="p-4">
          <Story />
        </div>
      </Suspense>
    ),
  ],
};

export default preview; 