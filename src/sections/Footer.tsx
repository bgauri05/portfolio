import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Linkedin, Github, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const terminalText = '> Caffeine.Curiosity.Init()'

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [displayedText, setDisplayedText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= terminalText.length) {
        setDisplayedText(terminalText.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
        // Restart after delay
        setTimeout(() => {
          setDisplayedText('')
          index = 0
        }, 4000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [])

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const content = section.querySelector('.footer-content')
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: content, start: 'top 90%', toggleActions: 'play none none none' }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="w-full py-20 md:py-28 px-6 lg:px-12 relative"
      style={{ background: '#1a1a1a' }}
    >
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      <div className="footer-content max-w-5xl mx-auto relative z-10">
        {/* Terminal typewriter */}
        <div className="mb-16 text-center">
          <div ref={terminalRef} className="inline-block">
            <span
              className="font-mono text-lg md:text-2xl lg:text-3xl"
              style={{
                color: '#d63384',
                textShadow: `
                  -1px -1px 0 rgba(214, 51, 132, 0.4),
                  -2px -2px 0 rgba(214, 51, 132, 0.35),
                  -3px -3px 0 rgba(214, 51, 132, 0.3),
                  -4px -4px 0 rgba(214, 51, 132, 0.25),
                  -5px -5px 0 rgba(214, 51, 132, 0.2),
                  -1px -2px 0 #c9a84c,
                  -2px -3px 0 #c9a84c,
                  -3px -4px 0 #c9a84c,
                  2px 2px 0 rgba(0,0,0,0.2)
                `,
              }}
            >
              {displayedText}
              <span
                className="inline-block w-[2px] h-[1em] bg-[#d63384] ml-0.5 align-middle"
                style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
              />
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="mb-12 flex flex-col items-center md:items-start gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl text-cream/90 mb-2">
              Let's connect
            </h3>
            <p className="font-body text-sm text-cream/50">
              Find me on GitHub or LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:gauribhonsle11@gmail.com"
              className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/gauribhonsle11905/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://github.com/bgauri05"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-8">
          <p className="font-body text-sm text-cream/40 flex items-center justify-center gap-2">
            built with caffeine, curiosity, and too many browser tabs
            <Sparkles className="w-3.5 h-3.5 text-gold/60" />
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-mono text-[11px] text-cream/30">
            &copy; 2025 Gauri Bhonsle. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-cream/30">
            Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  )
}
