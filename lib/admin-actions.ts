"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email"
import { revalidatePath } from "next/cache"

export async function updateApplicationStatus(entryId: string, status: "APPROVED" | "REJECTED") {
  try {
    // Update the status in Supabase
    const { data: entry, error } = await supabaseAdmin
      .from("waitlist_entries")
      .update({ status })
      .eq("id", entryId)
      .select()
      .single()

    if (error) {
      console.error("Error updating status in Supabase:", error)
      return { success: false, error: error.message }
    }

    // Send email notification to the applicant
    if (status === "APPROVED") {
      await sendApprovalEmail({
        name: entry.name,
        email: entry.email,
      })
    } else if (status === "REJECTED") {
      await sendRejectionEmail({
        name: entry.name,
        email: entry.email,
      })
    }

    // Revalidate the admin page to show updated data
    revalidatePath("/admin/waitlist")

    return { success: true }
  } catch (error: any) {
    console.error("Error updating application status:", error)
    return { success: false, error: error.message || "Failed to update application status" }
  }
}

