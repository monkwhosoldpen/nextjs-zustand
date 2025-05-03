"use client"

import * as React from "react"
import { Circle } from "lucide-react"

// Helper function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface RadioGroupContextType {
  value: string | undefined
  onValueChange: (value: string) => void
  name: string
}

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(undefined)

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error("RadioGroup components must be used within a RadioGroup")
  }
  return context
}

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  name: string
  className?: string
  children: React.ReactNode
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, name, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
    
    const currentValue = value !== undefined ? value : internalValue
    
    const handleValueChange = (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }
    
    return (
      <RadioGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, name }}>
        <div ref={ref} role="radiogroup" className={cn("grid gap-2", className)} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "checked" | "name" | "onChange" | "type"> {
  value: string
  className?: string
  disabled?: boolean
}

const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ className, value, disabled, ...props }, ref) => {
    const { value: groupValue, onValueChange, name } = useRadioGroupContext()
    const checked = value === groupValue
    
    return (
      <div ref={ref} className="flex items-center">
        <div
          className={cn(
            "aspect-square h-4 w-4 rounded-full border border-gray-400 text-gray-900 flex items-center justify-center relative",
            checked ? "border-gray-900" : "",
            disabled ? "cursor-not-allowed opacity-50" : "",
            className
          )}
        >
          <input
            type="radio"
            className="sr-only"
            value={value}
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={() => onValueChange(value)}
            {...props}
          />
          {checked && (
            <div className="flex items-center justify-center">
              <Circle className="h-2.5 w-2.5 fill-current text-current" />
            </div>
          )}
        </div>
      </div>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem } 