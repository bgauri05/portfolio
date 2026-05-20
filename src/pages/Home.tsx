import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import FloatingParticles from '@/components/FloatingParticles'
import MusicPlayer from '@/components/MusicPlayer'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Projects from '@/sections/Projects'
import Experience from '@/sections/Experience'
// Podcasts section removed per request
import Footer from '@/sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Init scroll-triggered animations for sections
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
      const elements = section.querySelectorAll('.fade-up')
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Refresh ScrollTrigger after all content loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timeout)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Footer />
      </main>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  )
}
