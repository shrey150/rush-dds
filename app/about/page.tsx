import { ShootingStarsScrollable } from "@/components/ui/shooting-stars-scrollable"
import { StarsBackground } from "@/components/ui/stars-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function About() {
    // Array of prestigious companies/institutions where members work
    const memberAffiliations = [
        "Capital One", "Google", "Goldman Sachs", "Apple", "Meta",
        "Ramp", "Shade", "Comulate", "Skyspecs", "Modern Treasury", "Magna", "Microsoft", "Uber",
        "Amazon", "IMC Trading", "OpenAI", "Qube Trading", "Jane Street", "Bubble", "Raytheon",
        "Coinbase", "MongoDB", "Databricks", "Hyperfan", "Datadog", "LinkedIn", "Pentair", "Courier Health",
        "Altrix", "LiberusAI", "Mastercard", "Unilever", "Susquehanna", "Cigna Group", "Dematic", "AMD", "Nvidia",
        "Edelweiss", "IBM", "Paypal", "Palantir", "Roblox", "Netflix", "AccoAI", "Forta", "Five Rings", "Wolverine Trading",
        "AeroVironment"
    ]

    return (
        <div className="relative bg-black text-white overflow-auto font-serif">            {/* Background elements */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(38,38,38,0.4),transparent)] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent pointer-events-none" />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <StarsBackground />
            </div>

            {/* Shooting stars effect - using the scrollable version */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ShootingStarsScrollable />
            </div>

            {/* Hero section with scroll indicator */}
            <section className="relative h-screen flex flex-col items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 mb-4">
                        Who Are We?
                    </h1>
                    <p className="text-lg md:text-xl text-gold-300/80 max-w-2xl mx-auto italic">
                        &ldquo;Per Ardua Ad Astra&rdquo;
                    </p>
                </div>

                {/* Bouncing scroll indicator */}
                <div className="absolute bottom-10 animate-bounce">
                    <ChevronDown className="h-8 w-8 text-gold-400/80" />
                </div>
            </section>

            {/* Main content */}
            <main className="relative z-10 container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    {/* About section */}
                    <div className="space-y-32">


                        {/* Member Affiliations */}
                        <section>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gold-400 text-center">Our Members&apos; Reach</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 backdrop-blur-sm bg-black/40 border border-gold-500/20 rounded-lg p-6">
                                {memberAffiliations.map((company) => (
                                    <div key={company} className="text-gold-300/80 py-2 px-1 text-center">
                                        {company}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Membership CTA */}
                        <section className="text-center">
                            <div className="backdrop-blur-sm bg-black/30 border border-gold-500/20 rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gold-400">Join Our Circle</h2>
                                <p className="text-gold-300/80 mb-8 max-w-xl mx-auto">
                                    Membership is by invitation only. If you believe you have what it takes to join our ranks, we welcome your application.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 bg-transparent"
                                    >
                                        <Link href="/waitlist">Request Invitation</Link>
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Bottom right footer */}
            <div className="fixed bottom-0 right-0 p-6 text-xs text-gold-700/50 z-20">
                <p>By Invitation Only</p>
            </div>
        </div>
    )
}
