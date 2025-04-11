"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { submitWaitlistApplication } from "@/lib/actions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  profession: z.string().min(2, {
    message: "Unique edge must be at least 2 characters.",
  }),
  reason: z.string().min(10, {
    message: "Please tell us a bit more about why you want to join.",
  }),
})

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      profession: "",
      reason: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Create a FormData object to pass to the server action
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("profession", values.profession)
      formData.append("reason", values.reason)

      const result = await submitWaitlistApplication(formData)

      if (result.success) {
        toast({
          title: "Application received!",
          description: "We'll review your application and get back to you soon.",
        })
        form.reset()
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-gold-500/20 bg-black/40 backdrop-blur-sm shadow-lg shadow-black/10 font-serif">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-serif">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-400 font-serif">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First and Last Name"
                      {...field}
                      className="bg-black/50 border-gold-500/30 text-white focus-visible:ring-gold-500/30 focus-visible:ring-offset-gold-500/20 font-serif"
                    />
                  </FormControl>
                  <FormMessage className="text-gold-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-400 font-serif">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your_name@email.com"
                      type="email"
                      {...field}
                      className="bg-black/50 border-gold-500/30 text-white focus-visible:ring-gold-500/30 focus-visible:ring-offset-gold-500/20 font-serif"
                    />
                  </FormControl>
                  <FormMessage className="text-gold-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-400 font-serif">Unique edge</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What makes you interesting?"
                      {...field}
                      className="bg-black/50 border-gold-500/30 text-white focus-visible:ring-gold-500/30 focus-visible:ring-offset-gold-500/20 font-serif"
                    />
                  </FormControl>
                  <FormMessage className="text-gold-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-400 font-serif">Why do you want to join?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about yourself and why you're interested in joining our network..."
                      className="min-h-[100px] bg-black/50 border-gold-500/30 text-white focus-visible:ring-gold-500/30 focus-visible:ring-offset-gold-500/20 font-serif"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gold-700/70 font-serif">This helps us understand if you&apos;re a good fit for our community.</FormDescription>
                  <FormMessage className="text-gold-300" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-transparent text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 border border-gold-500/30 font-serif"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request Invitation"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

