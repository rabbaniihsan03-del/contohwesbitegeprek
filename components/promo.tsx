'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const promos = [
  {
    title: 'Paket Hemat',
    description: 'Geprek + Nasi + Es Teh',
    originalPrice: 'Rp 30.000',
    discountPrice: 'Rp 22.000',
    badge: 'HEMAT 27%',
  },
  {
    title: 'Paket Rame-Rame',
    description: '3 Geprek + 3 Nasi + 3 Es Teh',
    originalPrice: 'Rp 90.000',
    discountPrice: 'Rp 60.000',
    badge: 'HEMAT 33%',
  },
]

export function Promo() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-br from-primary/20 via-background to-accent/20 overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={contentRef}
          className="relative bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground font-semibold text-sm mb-4">
                🔥 Promo Spesial
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                Promo Hemat Bulan Ini!
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Nikmati kelezatan ayam geprek dengan harga yang lebih terjangkau
              </p>
            </div>

            {/* Promo Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {promos.map((promo, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground rounded-2xl p-6 text-center shadow-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                >
                  {/* Badge */}
                  <div className="absolute -top-2 -right-8 bg-accent text-accent-foreground px-8 py-1 text-xs font-bold rotate-45 shadow-md">
                    {promo.badge}
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-2">{promo.title}</h3>
                  <p className="text-muted-foreground mb-4">{promo.description}</p>

                  {/* Prices */}
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground line-through">{promo.originalPrice}</p>
                    <p className="text-3xl font-bold text-primary">{promo.discountPrice}</p>
                  </div>

                  <a
                    href={`https://wa.me/6281564795908?text=Halo, saya mau pesan ${promo.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              ))}
            </div>

            {/* Free Delivery Banner */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-2xl">🚀</span>
                <p className="text-primary-foreground font-semibold">
                  FREE Es Teh untuk pembelian pertama via WhatsApp!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
