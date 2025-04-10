import { WaitlistForm } from "@/components/waitlist-form"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export default function Waitlist() {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(38,38,38,0.4),transparent)]" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

            {/* Stars background */}
            <StarsBackground />

            {/* Shooting stars effect */}
            <ShootingStars />

            {/* Main content */}
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 mb-2">
                            Apply to DDS
                        </h1>
                        <p className="text-gold-300/80">Connect with like-minded visionaries in our private community.</p>
                    </div>

                    <WaitlistForm />

                </div>
            </main>

            {/* Bottom right footer */}
            {/* Bottom right footer */}
            <div className="absolute bottom-0 right-0 p-6 text-xs text-gold-700/50 z-20">
                <p>By invitation only</p>
            </div>
        </div>
    )
}
