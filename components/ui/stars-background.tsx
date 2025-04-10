"use client"

import { useEffect, useState } from "react"

export function StarsBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            <style jsx global>{`
        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: twinkle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

            <div className="stars">
                {Array.from({ length: 150 }).map((_, i) => {
                    const size = Math.random() * 2 + 1;
                    const duration = Math.random() * 5 + 3; // 3-8 seconds
                    const delay = Math.random() * 5;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;

                    return (
                        <div
                            key={i}
                            className="star"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                left: `${posX}%`,
                                top: `${posY}%`,
                                opacity: Math.random() * 0.5 + 0.3,
                                boxShadow: size > 1.8 ? `0 0 ${size}px ${size / 2}px rgba(255, 255, 255, 0.3)` : 'none',
                                '--duration': `${duration}s`,
                                '--delay': `${delay}s`,
                            } as React.CSSProperties}
                        />
                    );
                })}
            </div>
        </>
    );
} 