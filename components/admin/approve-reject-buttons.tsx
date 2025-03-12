"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { updateApplicationStatus } from "@/lib/admin-actions"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ApproveRejectButtonsProps {
  entryId: string
}

export function ApproveRejectButtons({ entryId }: ApproveRejectButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    setIsLoading(true)
    try {
      const result = await updateApplicationStatus(entryId, status)

      if (result.success) {
        toast({
          title: "Status updated",
          description: `Application ${status.toLowerCase()} successfully.`,
        })
        // Refresh the page to show updated status
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
        onClick={() => handleStatusUpdate("APPROVED")}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
      </Button>
      <Button
        variant="outline"
        className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
        onClick={() => handleStatusUpdate("REJECTED")}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject"}
      </Button>
    </div>
  )
}

