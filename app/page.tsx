import { WaitlistForm } from "@/components/waitlist-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Join Diddy Daddy Saddy
          </h1>
          <p className="text-slate-600">Connect with like-minded professionals in our private networking group.</p>
        </div>

        <WaitlistForm />

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>By joining, you&apos;ll be notified when we have an opening for new members.</p>
        </div>
      </div>
    </main>
  )
}
