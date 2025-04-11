"use client"

import { useEffect, useState } from "react"

export function ShootingStars() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
        
        .shooting-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.1), 0 0 0 8px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1);
          animation: animate 3s linear infinite;
        }
        
        .shooting-star::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 300px;
          height: 1px;
          background: linear-gradient(90deg, #fff, transparent);
        }
        
        @keyframes animate {
          0% {
            transform: rotate(315deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(315deg) translateX(-1000px);
            opacity: 0;
          }
        }
        
        .shooting-star:nth-child(1) {
          top: 0;
          right: 0;
          left: initial;
          animation-delay: 5s;
          animation-duration: 4s;
        }
        
        .shooting-star:nth-child(2) {
          top: 0;
          right: 80px;
          left: initial;
          animation-delay: 8.5s;
          animation-duration: 6s;
        }
        
        .shooting-star:nth-child(3) {
          top: 80px;
          right: 0px;
          left: initial;
          animation-delay: 12.4s;
          animation-duration: 5s;
        }
        
        .shooting-star:nth-child(4) {
          top: 0;
          right: 180px;
          left: initial;
          animation-delay: 15.6s;
          animation-duration: 4.5s;
        }
        
        .shooting-star:nth-child(5) {
          top: 0;
          right: 400px;
          left: initial;
          animation-delay: 20.8s;
          animation-duration: 5.5s;
        }
        
        .shooting-star:nth-child(6) {
          top: 0;
          right: 600px;
          left: initial;
          animation-delay: 25s;
          animation-duration: 6s;
        }
      `}</style>

      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
    </>
  )
} 