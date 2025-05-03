import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/mycomponents/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'MyComponents/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion defaultValue="item-1" className="w-[350px]" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <Accordion className="w-[450px]" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Our product is designed to help you build beautiful interfaces.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responsive design</li>
            <li>Accessible components</li>
            <li>Themeable with Tailwind CSS</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Pricing Details</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Our pricing is simple and transparent:</p>
            <div className="grid grid-cols-2 gap-2 border-t pt-2">
              <div>Basic Plan</div>
              <div className="font-medium">$10/month</div>
              <div>Pro Plan</div>
              <div className="font-medium">$25/month</div>
              <div>Enterprise</div>
              <div className="font-medium">Contact sales</div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Can I cancel my subscription?</h4>
              <p className="text-sm text-muted-foreground">Yes, you can cancel anytime.</p>
            </div>
            <div>
              <h4 className="font-medium">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">We offer a 14-day free trial for all plans.</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithCustomStyles: Story = {
  render: (args) => (
    <Accordion className="w-[350px] border rounded-md p-2" {...args}>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="text-blue-600 hover:text-blue-800">
          First Item
        </AccordionTrigger>
        <AccordionContent className="text-sm">
          This accordion has custom styles applied to it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b-0">
        <AccordionTrigger className="text-blue-600 hover:text-blue-800">
          Second Item
        </AccordionTrigger>
        <AccordionContent className="text-sm">
          You can customize the appearance to match your design system.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}; 