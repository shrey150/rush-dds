import { supabaseAdmin } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ApproveRejectButtons } from "@/components/admin/approve-reject-buttons"
import { ExportButton } from "@/components/admin/export-button"

export default async function WaitlistAdmin() {
  // Fetch waitlist entries from Supabase
  const { data: entries, error } = await supabaseAdmin
    .from("waitlist_entries")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching entries:", error)
    return <div>Error loading waitlist entries</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Waitlist Applications</h1>
        <ExportButton entries={entries || []} />
      </div>

      <div className="grid gap-6">
        {!entries || entries.length === 0 ? (
          <p className="text-muted-foreground">No applications yet.</p>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{entry.name}</CardTitle>
                  <Badge
                    variant={
                      entry.status === "APPROVED" ? "default" : entry.status === "REJECTED" ? "destructive" : "outline"
                    }
                  >
                    {entry.status.toLowerCase()}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Applied {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <span className="font-medium">Email:</span> {entry.email}
                  </div>
                  <div>
                    <span className="font-medium">Unique Edge:</span> {entry.unique_edge}
                  </div>
                  <div>
                    <span className="font-medium">Reason:</span>
                    <p className="mt-1 text-muted-foreground">{entry.reason}</p>
                  </div>
                </div>

                {entry.status === "PENDING" && (
                  <div className="mt-4">
                    <ApproveRejectButtons entryId={entry.id} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

