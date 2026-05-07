'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Menu } from '@/components/menu'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { Promo } from '@/components/promo'
import { Location } from '@/components/location'
import { WhatsAppCTA, FloatingWhatsApp } from '@/components/whatsapp-cta'
import { Footer } from '@/components/footer'
import { LoadingScreen } from '@/components/loading-screen'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(target.getAttribute('href') || '')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', smoothScroll)

    // Refresh ScrollTrigger on page load
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('click', smoothScroll)
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Main Content */}
      <main className="relative overflow-x-hidden">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Menu Section */}
        <Menu />

        {/* Gallery Section */}
        <Gallery />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Promo Section */}
        <Promo />

        {/* Location Section */}
        <Location />

        {/* WhatsApp CTA Section */}
        <WhatsAppCTA />

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </main>
    </>
  )
}
