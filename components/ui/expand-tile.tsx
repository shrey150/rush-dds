// components/ui/expand-title.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ExpandTitleProps {
    shortText: string
    fullText: string
    className?: string
}

export function ExpandTitle({ shortText, fullText, className }: ExpandTitleProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h1
                className={cn(
                    "text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 transition-all duration-700 ease-in-out",
                    isHovered ? "opacity-0" : "opacity-100",
                    className
                )}
            >
                {shortText}
            </h1>
            <h1
                className={cn(
                    "text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform origin-center",
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75",
                    className
                )}
            >
                {fullText}
            </h1>
        </div>
    )
}