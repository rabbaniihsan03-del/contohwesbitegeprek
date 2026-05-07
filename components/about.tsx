'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '🐔',
    title: 'Ayam Pilihan',
    description: 'Hanya menggunakan ayam segar berkualitas tinggi yang dipilih setiap hari',
  },
  {
    icon: '🌶️',
    title: 'Sambal Homemade',
    description: 'Sambal khas racikan sendiri dari resep turun-temurun keluarga',
  },
  {
    icon: '👨‍🍳',
    title: 'Chef Berpengalaman',
    description: 'Diolah oleh chef profesional dengan standar kebersihan tinggi',
  },
  {
    icon: '❤️',
    title: 'Dibuat dengan Cinta',
    description: 'Setiap porsi dibuat dengan sepenuh hati untuk kepuasan Anda',
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Features stagger animation
      gsap.fromTo(
        featuresRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 85%',
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
      id="tentang"
      className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-primary font-semibold tracking-widest uppercase text-sm mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Cerita di Balik <span className="text-primary">Kelezatan</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">Geprek Nusantara</span> lahir dari kecintaan 
              kami terhadap kuliner Indonesia, khususnya ayam geprek yang menggugah selera dengan 
              kelezatan yang tak tertandingi.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Berawal dari dapur rumahan di tahun 2020, kami konsisten menghadirkan ayam geprek 
              dengan <span className="text-primary font-semibold">sambal khas homemade</span> yang 
              dibuat dari racikan bumbu pilihan dan cabai segar setiap hari.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Setiap gigitan adalah pengalaman kuliner yang tak terlupakan. Ayam crispy yang renyah 
              di luar, juicy di dalam, berpadu sempurna dengan sambal pedas yang bikin ketagihan.
            </p>

            {/* Features Grid */}
            <div ref={featuresRef} className="grid sm:grid-cols-2 gap-4 pt-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-300 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="/images/ingredients.jpg"
                alt="Bahan Berkualitas Geprek Nusantara"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/90 backdrop-blur-lg rounded-2xl p-4 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-2xl">
                      🔥
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Sejak 2020</p>
                      <p className="text-sm text-muted-foreground">Melayani ribuan pelanggan puas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
