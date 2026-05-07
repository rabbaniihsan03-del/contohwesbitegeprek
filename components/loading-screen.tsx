'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Animate loading screen
    const tl = gsap.timeline()

    tl.to('.loading-logo', {
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.out',
      yoyo: true,
      repeat: 2,
    })

    tl.to('.loading-text span', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: 'power2.out',
    }, '-=1')

    // Hide loading screen after animation
    const timer = setTimeout(() => {
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => setIsLoading(false),
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="loading-logo w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/50 mb-8">
        <span className="text-5xl">🔥</span>
      </div>

      {/* Brand Name */}
      <div className="loading-text flex gap-1 text-4xl font-bold">
        {['G', 'E', 'P', 'R', 'E', 'K'].map((letter, index) => (
          <span
            key={index}
            className="opacity-0 translate-y-4 text-foreground"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Loading Bar */}
      <div className="mt-8 w-48 h-1 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 100%;
            margin-left: 0%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  )
}
