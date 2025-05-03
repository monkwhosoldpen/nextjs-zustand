"use client"

import { useState } from "react"
import { Button } from "@/components/mycomponents/Button"
import { DialogFooter } from "@/components/mycomponents/Dialog"
import { Asset } from "@/lib/types"
// @ts-ignore - Using ts-ignore to temporarily resolve the missing module error
import { Loader2, ClipboardCheck } from "lucide-react"
import { Textarea } from "@/components/mycomponents/Textarea"
import { Label } from "@/components/mycomponents/Label"
import { RadioGroup, RadioGroupItem } from "@/components/mycomponents/RadioGroup"
import { toast } from "@/lib"

interface RequestAccessContentProps {
  asset: Asset
  onClose: () => void
}

export function RequestAccessContent({
  asset,
  onClose
}: RequestAccessContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [accessReason, setAccessReason] = useState("")
  const [whyNeeded, setWhyNeeded] = useState("")
  const [selectedReason, setSelectedReason] = useState("")

  const handleRequestAccess = async () => {
    // Validate form
    if (!selectedReason) {
      toast({
        title: "Please select a reason",
        description: "You need to select a reason for your access request.",
        variant: "destructive",
      })
      return
    }

    if (!whyNeeded) {
      toast({
        title: "Please explain why",
        description: "You need to explain why you need access to this asset.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset and close after showing success message
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main content area - scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <div className="space-y-4 pb-6">
          <p className="text-sm text-muted-foreground">
            You currently don't have access to this asset. Submit a request to gain access. 
            Your administrator will review your request.
          </p>
          
          <div className="border rounded-md p-3 bg-muted/50">
            <h3 className="font-medium text-sm">{asset.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {asset.description}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Why do you need access to this asset?</Label>
              <RadioGroup name="access-reason" value={selectedReason} onValueChange={setSelectedReason}>
                <div className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value="layouts" id="layouts" />
                  <Label htmlFor="layouts" className="cursor-pointer">I need to add to my layouts</Label>
                </div>
                <div className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value="analysis" id="analysis" />
                  <Label htmlFor="analysis" className="cursor-pointer">I need it for analysis</Label>
                </div>
                <div className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value="presentation" id="presentation" />
                  <Label htmlFor="presentation" className="cursor-pointer">I need it for a presentation</Label>
                </div>
                <div className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer">Other reason</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyNeeded">Please explain why you need access:</Label>
              <Textarea 
                id="whyNeeded" 
                placeholder="Explain why you need access to this asset..." 
                value={whyNeeded}
                onChange={(e) => setWhyNeeded(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer with action buttons */}
      <DialogFooter className="flex-shrink-0 sticky bottom-0 bg-background pt-4 pb-4 border-t z-10 px-6">
        <div className="flex w-full gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
            className="w-auto"
          >
            Cancel
          </Button>
          {isSuccess ? (
            <Button 
              disabled 
              className="bg-green-600 hover:bg-green-700 w-auto"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Request Submitted!
            </Button>
          ) : (
            <Button 
              onClick={handleRequestAccess}
              disabled={isSubmitting}
              className="w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : "Submit Request"}
            </Button>
          )}
        </div>
      </DialogFooter>
    </div>
  )
} 