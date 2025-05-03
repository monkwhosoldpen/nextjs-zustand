import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

// Context for handling accordion state
type AccordionContextType = {
  value: string | null;
  onValueChange: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Main Accordion component
interface AccordionProps {
  children: ReactNode;
  defaultValue?: string | null;
  className?: string;
}

export function Accordion({ 
  children, 
  defaultValue = null, 
  className = "" 
}: AccordionProps) {
  const [value, setValue] = useState<string | null>(defaultValue);

  const onValueChange = (newValue: string) => {
    // Toggle behavior - if the same value is clicked, close it
    setValue(prev => prev === newValue ? null : newValue);
  };

  return (
    <AccordionContext.Provider value={{ value, onValueChange }}>
      <div className={`space-y-1 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// AccordionItem component
interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ 
  children, 
  value, 
  className = "" 
}: AccordionItemProps) {
  return (
    <div 
      className={`border-b ${className}`} 
      data-state={useAccordionContext().value === value ? "open" : "closed"}
      data-value={value}
    >
      {children}
    </div>
  );
}

// AccordionTrigger component
interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ 
  children, 
  className = "" 
}: AccordionTriggerProps) {
  const { value, onValueChange } = useAccordionContext();
  const itemValue = getAccordionItemValue();
  
  const isOpen = value === itemValue;
  
  return (
    <button
      className={`flex w-full items-center justify-between py-4 font-medium transition-all hover:underline ${className}`}
      onClick={() => onValueChange(itemValue)}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
      <ChevronDown 
        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
  );
}

// AccordionContent component
interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ 
  children, 
  className = "" 
}: AccordionContentProps) {
  const { value } = useAccordionContext();
  const itemValue = getAccordionItemValue();
  
  const isOpen = value === itemValue;
  
  if (!isOpen) return null;
  
  return (
    <div
      className={`overflow-hidden pt-0 pb-4 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className}`}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  );
}

// Helper functions
function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion component");
  }
  return context;
}

function getAccordionItemValue(): string {
  // This is a simplified implementation - in a real component we'd use refs or other methods
  // Here we're just assuming the nearest parent with data-value is the accordion item
  if (typeof document !== 'undefined') {
    const el = document.activeElement;
    const item = el?.closest('[data-value]');
    return item?.getAttribute('data-value') || '';
  }
  return '';
} 