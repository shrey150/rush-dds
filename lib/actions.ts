"use server"

import { z } from "zod"
import { supabaseAdmin } from "@/lib/supabase"
import { sendWaitlistNotification, sendConfirmationEmail } from "@/lib/email"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  profession: z.string().min(2),
  reason: z.string().min(10),
})

export async function submitWaitlistApplication(formData: FormData) {
  try {
    const validatedFields = formSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      profession: formData.get("profession"),
      reason: formData.get("reason"),
    })

    // Store in Supabase
    const { data: entry, error } = await supabaseAdmin
      .from("waitlist_entries")
      .insert({
        name: validatedFields.name,
        email: validatedFields.email,
        unique_edge: validatedFields.profession,
        reason: validatedFields.reason,
        status: "PENDING",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error inserting into Supabase:", error)
      return { success: false, error: error.message }
    }

    // Send email notification to admin - don't throw if it fails
    const notificationResult = await sendWaitlistNotification({
      applicantName: validatedFields.name,
      applicantEmail: validatedFields.email,
      uniqueEdge: validatedFields.profession,
      reason: validatedFields.reason,
    })

    // If email notification failed, log but continue
    if (!notificationResult?.success) {
      console.log("Admin notification email failed, but form submission successful:", notificationResult?.error)
    }

    // Send confirmation email to applicant - don't throw if it fails
    const confirmationResult = await sendConfirmationEmail({
      name: validatedFields.name,
      email: validatedFields.email,
    })

    // If confirmation email failed, log but continue
    if (!confirmationResult?.success) {
      console.log("Confirmation email failed, but form submission successful:", confirmationResult?.error)
    }

    console.log("Waitlist entry stored with ID:", entry.id)

    // Return success even if emails failed
    return { success: true }
  } catch (error: unknown) {
    console.error("Error submitting waitlist application:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to submit application" 
    }
  }
}

