"use client"

import * as React from "react"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

// Helper function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ 
  open, 
  onOpenChange, 
  children 
}) => {
  return (
    <>{open && children}</>
  )
}

interface DialogTriggerProps {
  asChild?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ 
  children, 
  onClick,
  className
}) => {
  return (
    <button 
      className={className} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface DialogPortalProps {
  children: React.ReactNode
}

const DialogPortal: React.FC<DialogPortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || typeof document === "undefined") return null
  
  return createPortal(children, document.body)
}

interface DialogCloseProps {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

const DialogClose: React.FC<DialogCloseProps> = ({ 
  onClick, 
  children, 
  className 
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

interface DialogOverlayProps {
  className?: string
}

const DialogOverlay: React.FC<DialogOverlayProps> = ({ 
  className 
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80 animate-in fade-in-0",
        className
      )}
    />
  )
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
  onClose?: () => void
  hideCloseButton?: boolean
}

const DialogContent: React.FC<DialogContentProps> = ({ 
  className, 
  children, 
  onClose,
  hideCloseButton
}) => {
  // Close on escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose()
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])
  
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
        {!hideCloseButton && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </DialogPortal>
  )
}

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

const DialogTitle: React.FC<DialogTitleProps> = ({ 
  className, 
  children 
}) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
  >
    {children}
  </h2>
)

interface DialogDescriptionProps {
  className?: string
  children: React.ReactNode
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ 
  className, 
  children 
}) => (
  <p
    className={cn("text-sm text-gray-500", className)}
  >
    {children}
  </p>
)

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} 