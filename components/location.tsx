'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, MapPin, Phone, Bike } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const businessHours = [
  { day: 'Senin - Jumat', hours: '10:00 - 21:00' },
  { day: 'Sabtu - Minggu', hours: '10:00 - 22:00' },
]

const deliveryApps = [
  { name: 'GoFood', color: 'bg-green-600' },
  { name: 'GrabFood', color: 'bg-green-500' },
  { name: 'ShopeeFood', color: 'bg-orange-500' },
]

export function Location() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="lokasi"
      className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-primary font-semibold tracking-widest uppercase text-sm mb-4">
            Lokasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Temukan <span className="text-primary">Kami</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Kunjungi outlet kami atau pesan delivery ke lokasi Anda
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border aspect-[4/3] lg:aspect-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.321849889685!2d106.82496731476892!3d-6.221503395493384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e9459c4c6f%3A0x67c5573e8d2c43fe!2sMonas!5e0!3m2!1sen!2sid!4v1645678901234!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Geprek Nusantara"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-lg rounded-xl p-3 border border-border">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xl">🔥</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Geprek rabbdev</p>
                  <p className="text-xs text-muted-foreground">Outlet Utama</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Alamat</h3>
                  <p className="text-muted-foreground">
                    Jl. Raya rabbdev
                    <br />
                    Kecamatan Sedap, Jakarta Selatan 12345
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold mt-3 hover:underline"
                  >
                    <span>Buka di Google Maps</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-3">Jam Buka</h3>
                  <div className="space-y-2">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{schedule.day}</span>
                        <span className="font-semibold text-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Buka Sekarang
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Kontak</h3>
                  <p className="text-muted-foreground mb-1">WhatsApp: +62 812-3456-7890</p>
                  <p className="text-muted-foreground">Email: halo@gepreknusantara.com</p>
                </div>
              </div>
            </div>

            {/* Delivery Apps Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Bike className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-3">Tersedia di</h3>
                  <div className="flex flex-wrap gap-2">
                    {deliveryApps.map((app, index) => (
                      <span
                        key={index}
                        className={`${app.color} text-foreground px-4 py-2 rounded-full text-sm font-semibold`}
                      >
                        {app.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
