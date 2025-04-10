import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe } from "@/components/ui/globe"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export default function Home() {
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
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-screen">
        <div className="max-w-3xl w-full mx-auto text-center space-y-4 -mt-16">
          {/* Main heading with mysterious styling */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600">
            DIES DUCIT SOL
          </h1>

          <p className="text-lg md:text-xl text-gold-300/80 mt-6 max-w-xl mx-auto font-light tracking-wide">
            The sun leads the day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 bg-transparent"
            >
              <Link href="/waitlist">Request Invitation</Link>
            </Button>
            <Button
              asChild
              className="bg-gold-600 text-black hover:bg-gold-500"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Globe at bottom, half-cropped */}
      <div className="absolute bottom-[-350px] left-1/2 transform -translate-x-1/2 z-0">
        <div className="relative w-[800px] h-[800px]">
          <Globe className="w-full h-full opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Bottom right footer */}
      <div className="absolute bottom-0 right-0 p-6 text-xs text-gold-700/50 z-20">
        <p>By invitation only</p>
      </div>
    </div>
  )
}

