"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Define a proper interface for waitlist entries
interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  unique_edge: string;
  reason: string;
  status: string;
  created_at: string;
}

interface ExportButtonProps {
  entries: WaitlistEntry[]
}

export function ExportButton({ entries }: ExportButtonProps) {
  const handleExport = () => {
    // Ensure we have all entries sorted by creation date
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Convert entries to CSV format
    const headers = ["Name", "Email", "Unique Edge", "Reason", "Status", "Created At"]
    const csvRows = [
      headers.join(","),
      ...sortedEntries.map((entry) =>
        [
          `"${entry.name.replace(/"/g, '""')}"`,
          `"${entry.email.replace(/"/g, '""')}"`,
          `"${entry.unique_edge.replace(/"/g, '""')}"`,
          `"${entry.reason.replace(/"/g, '""')}"`,
          entry.status,
          new Date(entry.created_at).toISOString(),
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `Waitlist Export ${new Date().toLocaleDateString().replace(/\//g, ' ')}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  )
}

