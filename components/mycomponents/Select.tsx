"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { createPortal } from "react-dom"

// Helper function to combine classnames
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
}

const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  defaultValue,
  children
}) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  
  // Initialize with default value if provided
  React.useEffect(() => {
    if (defaultValue && !value) {
      onValueChange(defaultValue)
    }
  }, [defaultValue, value, onValueChange])
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, triggerRef }}>
      {children}
    </SelectContext.Provider>
  )
}

interface SelectGroupProps {
  children: React.ReactNode
}

const SelectGroup: React.FC<SelectGroupProps> = ({ children }) => {
  return (
    <div role="group">{children}</div>
  )
}

interface SelectValueProps {
  placeholder?: string
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = useSelectContext()
  
  return (
    <span className="line-clamp-1">
      {value || placeholder || "Select an option"}
    </span>
  )
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, triggerRef } = useSelectContext()
  
  return (
    <button
      ref={triggerRef}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

interface SelectContentProps {
  className?: string
  children: React.ReactNode
  position?: "popper" | "item-aligned"
}

const SelectContent: React.FC<SelectContentProps> = ({
  className,
  children,
  position = "popper",
}) => {
  const { open, setOpen, triggerRef } = useSelectContext()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [coords, setCoords] = React.useState({ top: 0, left: 0, width: 0 })
  
  // Handle click outside to close the select
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setOpen, triggerRef])
  
  // Close on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [setOpen])
  
  // Calculate position based on trigger
  React.useEffect(() => {
    setMounted(true)
    
    if (triggerRef.current && open) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
  }, [open, triggerRef])
  
  if (!mounted || !open) return null
  
  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: position === "popper" ? `${coords.width}px` : "auto"
      }}
    >
      <div className="p-1 overflow-auto max-h-72">
        {children}
      </div>
    </div>,
    document.body
  )
}

interface SelectLabelProps {
  className?: string
  children: React.ReactNode
}

const SelectLabel: React.FC<SelectLabelProps> = ({ className, children }) => {
  return (
    <div className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}>
      {children}
    </div>
  )
}

interface SelectItemProps {
  className?: string
  children: React.ReactNode
  value: string
  disabled?: boolean
}

const SelectItem: React.FC<SelectItemProps> = ({
  className,
  children,
  value,
  disabled = false,
  ...props
}) => {
  const { value: selectedValue, onValueChange, setOpen } = useSelectContext()
  const isSelected = selectedValue === value
  
  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        isSelected ? "bg-gray-100" : "",
        disabled ? "pointer-events-none opacity-50" : "",
        className
      )}
      onClick={() => {
        if (!disabled) {
          onValueChange(value)
          setOpen(false)
        }
      }}
      role="option"
      aria-selected={isSelected}
      data-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span>{children}</span>
    </div>
  )
}

interface SelectSeparatorProps {
  className?: string
}

const SelectSeparator: React.FC<SelectSeparatorProps> = ({ className }) => {
  return (
    <div className={cn("-mx-1 my-1 h-px bg-gray-200", className)} role="separator" />
  )
}

const SelectScrollUpButton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex cursor-default items-center justify-center py-1", className)}>
      <ChevronUp className="h-4 w-4" />
    </div>
  )
}

const SelectScrollDownButton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex cursor-default items-center justify-center py-1", className)}>
      <ChevronDown className="h-4 w-4" />
    </div>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} 