import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


// obsessions, stats and personalFacts removed per user request



export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate section title
    const title = section.querySelector('.about-title')
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }

    // (Personal fact cards removed)

    // Animate narrative
    const narrative = section.querySelector('.narrative')
    if (narrative) {
      gsap.fromTo(narrative,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: narrative, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }

    // (Obsessions and stats removed)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 lg:px-12 relative"
    >
      {/* Background texture */}
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="about-title mb-16">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-3">
            [ 02 — About ]
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1]">
            The Flowchart<br />of Self
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image (personal facts removed) */}
          <div className="relative">
            {/* Portrait with gold border */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0 mb-10">
              <div className="gold-border rounded-[24px] overflow-hidden">
                <img
                  src="/images/workspace.jpg"
                  alt="Gauri's aesthetic workspace"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating decorative */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-blush/40 backdrop-blur-sm flex items-center justify-center animate-float">
                <span className="text-2xl">💻</span>
              </div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center animate-float-slow">
                <span className="text-gold text-lg">✦</span>
              </div>
            </div>

            {/* personal facts removed */}
          </div>

          {/* Right: Narrative */}
          <div className="narrative">
            <div className="glass-card p-8 md:p-10 mb-10">
              <p className="font-body text-lg md:text-xl text-charcoal/80 leading-[1.7] mb-6">
                Ever since I was a kid, I dreamed of renaming code files to FINAL_v2_actualfinal. Period.
              </p>

              <p className="font-body text-lg text-charcoal/80 leading-[1.7] mb-6">
                Hi — I’m Gauri, a final-year student at KJ Somaiya College of Engineering. I survive on espressos, deadlines, and the false confidence of saying “this bug should be easy to fix.” I work across full-stack development, machine learning, GenAI, LLMs, and business analytics — which basically means I enjoy learning new technologies until they start working. I like building clean, useful products that feel effortless.
              </p>

              <p className="font-body text-lg text-charcoal/80 leading-[1.7]">
                Most of the time you’ll find me switching between VS Code tabs, overthinking UI colors, training models that may or may not cooperate, or convincing myself that starting another side project is a great idea. If it involves tech, creativity, data, or caffeine — I’m probably already interested.
              </p>
            </div>

            {/* obsessions and stats removed */}
          </div>
        </div>
      </div>
    </section>
  )
}
