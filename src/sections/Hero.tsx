import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowRight, Heart } from 'lucide-react'

const roles = ['Data Analyst', 'ML Engineer', 'Problem Solver', 'Mumbai Girl']

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const [currentRole, setCurrentRole] = useState(0)
  const rafRef = useRef<number>(0)

  // 3D tilt effect
  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const layers = container.querySelectorAll<HTMLDivElement>('.tilt-layer')

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      }
    }

    const animate = () => {
      const lerp = 0.08
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * lerp
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * lerp

      const rotateX = currentRef.current.y * -20
      const rotateY = currentRef.current.x * 20
      const translateZ = 500 - (Math.abs(currentRef.current.x) + Math.abs(currentRef.current.y)) * 100

      container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`

      layers.forEach((layer, i) => {
        const depth = i + 1
        const pushX = currentRef.current.x * depth * 20
        const pushY = currentRef.current.y * depth * 20
        const rotateZ = (currentRef.current.x * depth * 2).toFixed(2)
        const baseZ = -50 * (i + 1)
        layer.style.transform = `translateZ(${baseZ}px) translateX(${pushX}px) translateY(${pushY}px) rotateZ(${rotateZ}deg)`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    wrapper.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Title entrance animation
  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char')
      gsap.fromTo(
        chars,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: 'expo.out',
          delay: 0.3,
        }
      )
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
      )
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 1.6 }
      )
    }
  }, [])

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Split text into chars
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformOrigin: 'center bottom' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Tilt Layer System */}
      <div
        ref={wrapperRef}
        className="w-full min-h-screen relative overflow-hidden perspective-2000 flex items-center justify-center"
      >
        <div
          ref={containerRef}
          className="relative w-full h-full preserve-3d flex items-center justify-center"
          style={{ transition: 'transform 0.1s ease-out' }}
        >
          {/* Layer 1: Base gradient */}
          <div className="tilt-layer absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #f2c4ce 0%, #faf7f5 100%)' }}
          />

          {/* Layer 2: Dot grid */}
          <div
            className="tilt-layer absolute inset-0 flex items-center justify-center dot-grid"
            style={{ opacity: 0.25 }}
          />

          {/* Layer 3: Floating code snippets */}
          <div className="tilt-layer absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-[15%] left-[10%] font-mono text-xs text-hot-pink/30 rotate-[-12deg] animate-float">
              {'import numpy as np'}
            </div>
            <div className="absolute top-[25%] right-[12%] font-mono text-xs text-gold/40 rotate-[8deg] animate-float-slow">
              {'model = XGBoost()'}
            </div>
            <div className="absolute bottom-[20%] left-[15%] font-mono text-xs text-dusty-rose/35 rotate-[5deg] animate-float">
              {'df.groupby("category")'}
            </div>
            <div className="absolute bottom-[30%] right-[8%] font-mono text-xs text-hot-pink/25 rotate-[-6deg] animate-float-slow">
              {'accuracy: 0.9987'}
            </div>
          </div>

          {/* Layer 4: Large decorative shapes */}
          <div className="tilt-layer absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-[40vw] h-[40vw] rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), #f2c4ce)',
                filter: 'blur(30px)',
                opacity: 0.5,
                top: '10%',
                right: '-10%',
              }}
            />
            <div
              className="absolute w-[25vw] h-[25vw] rounded-full"
              style={{
                background: 'radial-gradient(circle at 40% 40%, rgba(201, 168, 76, 0.3), transparent)',
                filter: 'blur(40px)',
                opacity: 0.6,
                bottom: '15%',
                left: '-5%',
              }}
            />
          </div>

          {/* Layer 5: Portrait image */}
          {/* Layer 5: Portrait image removed per request */}

          {/* Layer 6: Floating stars */}
          <div className="tilt-layer absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="absolute top-[12%] left-[20%] text-gold text-2xl animate-sparkle" style={{ animationDelay: '0s' }}>✦</span>
            <span className="absolute top-[18%] right-[25%] text-gold/70 text-lg animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</span>
            <span className="absolute bottom-[22%] left-[30%] text-dusty-rose text-xl animate-sparkle" style={{ animationDelay: '1s' }}>✦</span>
            <span className="absolute bottom-[15%] right-[20%] text-gold/50 text-sm animate-sparkle" style={{ animationDelay: '1.5s' }}>✦</span>
            <span className="absolute top-[40%] left-[8%] text-dusty-rose/60 text-lg animate-sparkle" style={{ animationDelay: '0.8s' }}>✦</span>
          </div>

          {/* Layer 7: Hero content (text + CTAs) */}
          <div className="tilt-layer absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            {/* Name */}
            <h1
              ref={titleRef}
              className="font-display text-[10vw] md:text-[8vw] lg:text-[6vw] text-charcoal leading-[1.1] tracking-tight mb-6 preserve-3d"
              style={{ textShadow: '2px 4px 20px rgba(242, 196, 206, 0.3)' }}
            >
              <span className="block">{splitText('GAURI')}</span>
              <span className="block">{splitText('BHONSLE')}</span>
            </h1>

            {/* Subtitle / Role cycling */}
            <div ref={subtitleRef} className="mb-4">
              <p className="font-mono text-sm md:text-base text-charcoal/60 uppercase tracking-[0.2em] mb-3">
                building intelligent systems with an aesthetic
              </p>
              <div className="font-mono text-xs text-gold uppercase tracking-[0.15em] h-6">
                <span
                  key={currentRole}
                  className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  {roles[currentRole]}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-sm text-charcoal transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 4s ease infinite',
                  boxShadow: '0 4px 20px rgba(201, 168, 76, 0.3)',
                }}
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full glass-card font-body text-sm text-charcoal hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Say Hello
                <Heart className="w-4 h-4 text-dusty-rose" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] text-charcoal/50 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-charcoal/30 to-transparent" />
      </div>
    </section>
  )
}
