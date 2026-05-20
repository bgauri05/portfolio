import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'ForensiAir',
    badge: '🔴 Live / Ongoing',
    image: '/images/project-forensiair.jpg',
    description: 'Emission tamper detection system for MPCB officials — ensemble ML with 100% precision, zero false positives.',
    stack: ['Python', 'FastAPI', 'React', 'TimescaleDB', 'XGBoost', 'SHAP'],
    details: 'An end-to-end emission monitoring and tamper detection platform built for the Maharashtra Pollution Control Board. Uses ensemble ML models to identify anomalous emission patterns with explainable AI via SHAP values.',
    repo: 'https://github.com/bgauri05/ForensiAir---AI-powered-surveillance-for-industrial-emissions',
    live: null,
  },
  {
    id: 2,
    title: 'BrandSetu',
    badge: null,
    image: '/images/project-brandsetu.jpg',
    description: 'AI-powered multi-agent social media content generation platform with a "Sentinel" critique agent and approval gates.',
    stack: ['LangGraph', 'FastAPI', 'Supabase', 'pgvector', 'RAG'],
    details: 'An agentic AI platform that autonomously generates, critiques, and approves social media content. Features a multi-agent pipeline with a "Sentinel" critique agent for quality control — no manual oversight required.',
    repo: 'https://github.com/ArchitSingh07/BRAND-SETU',
    live: 'https://brand-setu.vercel.app/',
  },
  {
    id: 3,
    title: 'Restaurant Management System - INKA',
    badge: null,
    image: '/images/Screenshot 2026-05-20 151646.png',
    description: 'Dynamic restaurant website with drag-and-drop orders, table booking, and a fun quiz section.',
    stack: ['Frontend: HTML, CSS, JavaScript', 'Backend: PHP', 'Database: MySQL', 'Design: Figma', 'Deployment: GitHub Pages'],

    details: 'INKA is a web-based system tailored for cafes looking to modernize their operations. It simplifies the ordering process with drag-and-drop interactions, personalizes customer engagement through quizzes and memberships, and equips admins with tools for managing orders, bookings, and feedback — all from a clean, easy-to-use interface.',
    repo: 'https://github.com/bgauri05/restaurant-website',
    live: 'https://bgauri05.github.io/restaurant-website/',
  },
  {
    id: 4,
    title: 'Vessel Fuel & CO₂ Predictor',
    badge: null,
    image: '/images/Screenshot 2026-05-20 152811.png',
    description: 'Replaced manual fleet reporting with real-time prediction + live Power BI dashboard.',
    stack: ['Google Sheets API', 'Power BI', 'Python'],
    details: 'End‑to‑end machine learning project that predicts vessel fuel consumption and CO₂ emissions using a synthetic maritime dataset. Includes model training in Python, an interactive Streamlit app for voyage‑level predictions, and a Power BI report built from logged prediction data to explore operational and environmental insights.',
    repo: null,
    live: 'https://vessel-fuel-co2-prediction-synergyship.streamlit.app/',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const title = section.querySelector('.projects-title')
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }

    const cards = section.querySelectorAll('.project-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 80%', toggleActions: 'play none none none' }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 lg:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="projects-title mb-16">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-3">
            [ 03 — Projects ]
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1]">
            The Highlight<br />Reel
          </h2>
          
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative"
              style={{ perspective: '2000px' }}
              onMouseEnter={() => setFlippedCard(project.id)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className="relative preserve-3d transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === project.id ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  transition: 'transform 1s cubic-bezier(0.2, 1, 0.3, 1)',
                }}
              >
                {/* Front */}
                <div
                  className="glass-card overflow-hidden relative backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    minHeight: '420px',
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Badge */}
                    {project.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-sm">
                        <span className="font-mono text-[10px] text-white uppercase tracking-wider">
                          {project.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-charcoal/70 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full font-mono text-[10px] text-charcoal/70 border border-charcoal/10 hover:border-gold/40 hover:text-gold transition-all duration-300"
                          style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Shimmer overlay on hover */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(45deg, transparent 40%, rgba(201, 168, 76, 0.1) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s infinite linear',
                    }}
                  />
                </div>

                {/* Back */}
                <div
                  className="glass-card overflow-hidden absolute inset-0 backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, rgba(242, 196, 206, 0.3) 0%, rgba(250, 247, 245, 0.8) 100%)',
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-gold mb-4">
                        {project.title}
                      </h3>
                      <p className="font-body text-sm text-charcoal/80 leading-relaxed mb-6">
                        {project.details}
                      </p>

                      <div className="mb-4">
                        <span className="font-mono text-[10px] text-gold uppercase tracking-wider block mb-2">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full font-mono text-[10px] text-charcoal/70 border border-gold/30"
                              style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs text-charcoal border border-charcoal/20 hover:border-gold hover:text-gold transition-all duration-300"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      ) : (
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs text-charcoal border border-charcoal/20 opacity-50 cursor-not-allowed">
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </button>
                      )}

                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs text-charcoal border border-charcoal/20 hover:border-gold hover:text-gold transition-all duration-300"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      ) : (
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs text-charcoal border border-charcoal/20 opacity-50 cursor-not-allowed">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Gold shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent 40%, rgba(201, 168, 76, 0.15) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s infinite linear',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
