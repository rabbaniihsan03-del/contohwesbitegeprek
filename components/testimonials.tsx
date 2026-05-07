'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Wijaya',
    role: 'Food Blogger',
    rating: 5,
    text: 'Geprek terenak yang pernah saya coba! Sambalnya beneran homemade dan pedasnya nampol. Ayamnya juga crispy banget, gak berminyak. Definitely akan balik lagi!',
    avatar: '👩‍💼',
  },
  {
    name: 'Budi Santoso',
    role: 'Regular Customer',
    rating: 5,
    text: 'Sudah langganan dari awal buka. Kualitasnya konsisten, porsinya mengenyangkan, dan harganya sangat worth it. Geprek Mozzarella favorit saya!',
    avatar: '👨‍💻',
  },
  {
    name: 'Anisa Rahmawati',
    role: 'Mahasiswa',
    rating: 5,
    text: 'Tempatnya cozy, makannya enak, harganya mahasiswa-friendly. Sambal ijonya juara banget! Pasti rekomendasiin ke temen-temen.',
    avatar: '👩‍🎓',
  },
  {
    name: 'Rizky Pratama',
    role: 'Pekerja Kantoran',
    rating: 5,
    text: 'Delivery-nya cepat dan packaging-nya rapi. Sampai rumah masih anget dan crispy. Level pedasnya bisa request, mantap!',
    avatar: '👨‍💼',
  },
  {
    name: 'Dewi Lestari',
    role: 'Ibu Rumah Tangga',
    rating: 5,
    text: 'Anak-anak suka banget sama geprek keju-nya. Saya suka sambal originalnya yang pedesnya pas. Sekarang jadi menu wajib keluarga!',
    avatar: '👩',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      ref={sectionRef}
      id="testimoni"
      className="py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-primary font-semibold tracking-widest uppercase text-sm mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Apa Kata <span className="text-primary">Mereka?</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Ribuan pelanggan telah merasakan kelezatan Geprek rabbdev
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div
            ref={sliderRef}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary/20 text-8xl font-serif">
              &ldquo;
            </div>

            {/* Content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-muted hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">5K+</div>
            <div className="text-muted-foreground mt-2">Pelanggan</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">4.9</div>
            <div className="text-muted-foreground mt-2">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground mt-2">Review</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">98%</div>
            <div className="text-muted-foreground mt-2">Puas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
