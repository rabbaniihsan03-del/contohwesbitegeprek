'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const menuItems = [
  {
    name: 'Geprek Original',
    description: 'Ayam crispy dengan sambal merah pedas klasik',
    price: 'Rp 18.000',
    spiceLevel: 3,
    image: '/images/geprek-original.jpg',
    badge: 'Best Seller',
  },
  {
    name: 'Geprek Mozzarella',
    description: 'Ayam geprek dengan lelehan keju mozzarella premium',
    price: 'Rp 25.000',
    spiceLevel: 2,
    image: '/images/geprek-mozzarella.jpg',
    badge: 'Favorit',
  },
  {
    name: 'Geprek Sambal Ijo',
    description: 'Sambal hijau segar dari cabai rawit hijau pilihan',
    price: 'Rp 20.000',
    spiceLevel: 4,
    image: '/images/geprek-sambal-ijo.jpg',
    badge: null,
  },
  {
    name: 'Geprek Keju Leleh',
    description: 'Double cheese explosion dengan sambal creamy',
    price: 'Rp 28.000',
    spiceLevel: 2,
    image: '/images/geprek-keju.jpg',
    badge: 'New',
  },
]

function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm transition-all duration-300 ${i <= level ? 'grayscale-0' : 'grayscale opacity-30'}`}
        >
          🌶️
        </span>
      ))}
    </div>
  )
}

export function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="menu"
      className="py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-primary font-semibold tracking-widest uppercase text-sm mb-4">
            Menu Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Menu <span className="text-primary">Best Seller</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Pilihan menu ayam geprek favorit pelanggan dengan berbagai level pedas dan topping premium
          </p>
        </div>

        {/* Menu Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        item.badge === 'Best Seller'
                          ? 'bg-primary text-primary-foreground'
                          : item.badge === 'New'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Spice Level */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">Level Pedas:</span>
                  <SpiceLevel level={item.spiceLevel} />
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-bold text-primary">{item.price}</span>
                  <a
                    href={`https://wa.me/6281234567890?text=Halo, saya mau pesan ${item.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:scale-110"
                    aria-label={`Pesan ${item.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Menu CTA */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/6281234567890?text=Halo, saya ingin melihat menu lengkap"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-border hover:border-primary"
          >
            <span>Lihat Menu Lengkap</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
