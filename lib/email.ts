import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type WaitlistNotificationProps = {
  applicantName: string
  applicantEmail: string
  uniqueEdge: string
  reason: string
}

type ApplicantEmailProps = {
  name: string
  email: string
}

export async function sendWaitlistNotification({
  applicantName,
  applicantEmail,
  uniqueEdge,
  reason,
}: WaitlistNotificationProps) {
  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    console.error("Admin email not configured")
    throw new Error("Admin email not configured")
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Diddy Daddy Saddy <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Waitlist Application: ${applicantName}`,
      html: `
        <h1>New Waitlist Application</h1>
        <p><strong>Name:</strong> ${applicantName}</p>
        <p><strong>Email:</strong> ${applicantEmail}</p>
        <p><strong>Unique Edge:</strong> ${uniqueEdge}</p>
        <p><strong>Reason for joining:</strong> ${reason}</p>
        <p>Login to the admin dashboard to approve or reject this application.</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Error in sendWaitlistNotification:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// Send confirmation email to applicant when they join the waitlist
export async function sendConfirmationEmail({ name, email }: ApplicantEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Diddy Daddy Saddy <onboarding@resend.dev>",
      to: email,
      subject: "Your Waitlist Application Has Been Received",
      html: `
        <h1>Thank You for Joining Our Waitlist!</h1>
        <p>Hi ${name},</p>
        <p>We've received your application to join the Diddy Daddy Saddy networking group. We're currently reviewing your application and will get back to you soon.</p>
        <p>In the meantime, feel free to follow us on social media to stay updated.</p>
        <p>Best regards,<br>The Diddy Daddy Saddy Team</p>
      `,
    })

    if (error) {
      console.error("Error sending confirmation email:", error)
      return { success: false, error: error.message }
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Error in sendConfirmationEmail:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// Send approval email to applicant
export async function sendApprovalEmail({ name, email }: ApplicantEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Diddy Daddy Saddy <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Diddy Daddy Saddy!",
      html: `
        <h1>Your Application Has Been Approved!</h1>
        <p>Hi ${name},</p>
        <p>We're excited to inform you that your application to join the Diddy Daddy Saddy networking group has been approved!</p>
        <p>Here's what happens next:</p>
        <ol>
          <li>You'll receive an invitation to our private chat platform within 24 hours</li>
          <li>Once you join, please introduce yourself to the community</li>
          <li>Check out our community guidelines and upcoming events</li>
        </ol>
        <p>We're looking forward to connecting with you!</p>
        <p>Best regards,<br>The Diddy Daddy Saddy Team</p>
      `,
    })

    if (error) {
      console.error("Error sending approval email:", error)
      return { success: false, error: error.message }
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Error in sendApprovalEmail:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// Send rejection email to applicant
export async function sendRejectionEmail({ name, email }: ApplicantEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Diddy Daddy Saddy <onboarding@resend.dev>",
      to: email,
      subject: "Update on Your Diddy Daddy Saddy Application",
      html: `
        <h1>Application Status Update</h1>
        <p>Hi ${name},</p>
        <p>Thank you for your interest in joining the Diddy Daddy Saddy networking group.</p>
        <p>After careful consideration, we regret to inform you that we are unable to approve your application at this time. We receive many applications and have limited spots available.</p>
        <p>We encourage you to apply again in the future as our community evolves and expands.</p>
        <p>Best regards,<br>The Diddy Daddy Saddy Team</p>
      `,
    })

    if (error) {
      console.error("Error sending rejection email:", error)
      return { success: false, error: error.message }
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Error in sendRejectionEmail:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

