import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, MapPin, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: 'Data Analyst Intern',
    company: 'Synergy Marine Group',
    period: 'Dec 2025 – Jan 2026',
    location: 'Mumbai',
    points: [
      'Built KPI dashboards for fleet operations monitoring',
      'Mapped Agile workflows across cross-functional teams',
      'Developed end-to-end automation pipeline for reporting',
      'Created real-time vessel fuel & CO₂ prediction system',
    ],
  },
  {
    title: 'Web Design Intern',
    company: 'SAN HR & Advisors',
    period: 'June 2024 – Aug 2024',
    location: 'Mumbai',
    points: [
      'Designed UX-focused digital content for HR platforms',
      'Collaborated with cross-functional stakeholders',
      'Created responsive web interfaces and design systems',
    ],
  },
]

const education = {
  degree: 'BTech Computer Engineering',
  school: 'KJ Somaiya College of Engineering',
  period: 'Aug 2023 – Present',
  location: 'Mumbai',
}

const certifications = [
  { name: 'Understanding Financial Markets', provider: 'University of Geneva (Coursera)', icon: '📈' },
  { name: 'Advanced Business Analytics: Excel Optimization', provider: 'Johns Hopkins (Coursera)', icon: '📊' },
  { name: 'McKinsey Forward Learning Program', provider: 'McKinsey & Company', icon: '🎯' },
  { name: 'Data Analytics Job Simulation', provider: 'Deloitte Australia (Forage)', icon: '🔍' },
  { name: 'Intro to TensorFlow for AI, ML & DL', provider: 'DeepLearning.AI (Coursera)', icon: '🧠' },
]

const skills = {
  'Languages': ['Python', 'SQL', 'Java', 'R'],
  'Data & Analytics': ['Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'Tableau'],
  'AI/ML': ['Random Forest', 'LightGBM', 'NLP', 'Multimodal Models', 'RAG', 'LangChain'],
  'Full Stack': ['React', 'Node.js', 'Express.js', 'MongoDB', 'FastAPI'],
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const title = section.querySelector('.exp-title')
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }

    const timelineItems = section.querySelectorAll('.timeline-item')
    gsap.fromTo(timelineItems,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: timelineItems[0], start: 'top 80%', toggleActions: 'play none none none' }
      }
    )

    const eduCard = section.querySelector('.edu-card')
    if (eduCard) {
      gsap.fromTo(eduCard,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: eduCard, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    }

    const certCards = section.querySelectorAll('.cert-card')
    gsap.fromTo(certCards,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: certCards[0], start: 'top 85%', toggleActions: 'play none none none' }
      }
    )

    const skillCategories = section.querySelectorAll('.skill-category')
    gsap.fromTo(skillCategories,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: skillCategories[0], start: 'top 85%', toggleActions: 'play none none none' }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 lg:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="exp-title mb-16">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.2em] block mb-3">
            [ 04 — Experience ]
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1]">
            How I Got<br />Here
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Timeline */}
          <div className="lg:col-span-3">
            {/* Timeline line */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/30 to-transparent" />

              {/* Experience entries */}
              <div className="space-y-10">
                {experiences.map((exp, i) => (
                  <div key={i} className="timeline-item relative pl-12">
                    {/* Node */}
                    <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-cream border-2 border-gold flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    </div>

                    <div className="glass-card p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-display text-xl md:text-2xl text-charcoal">
                          {exp.title}
                        </h3>
                        <span className="text-gold">|</span>
                        <span className="font-body text-sm text-gold">
                          {exp.company}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-charcoal/50">
                        <span className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[11px]">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {exp.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2 font-body text-sm text-charcoal/70">
                            <span className="text-gold mt-1">—</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* Education */}
                <div className="timeline-item relative pl-12">
                  <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-cream border-2 border-dusty-rose flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-dusty-rose" />
                  </div>

                  <div className="edu-card glass-card p-6 md:p-8 border-dusty-rose/30">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-display text-xl md:text-2xl text-charcoal">
                        {education.degree}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-dusty-rose mb-2">
                      {education.school}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-charcoal/50">
                      <span className="flex items-center gap-1.5 font-mono text-[11px]">
                        <Calendar className="w-3 h-3" />
                        {education.period}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[11px]">
                        <MapPin className="w-3 h-3" />
                        {education.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Certifications */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-gold inline-block" />
              Certifications
            </h3>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="cert-card glass-card p-4 flex items-start gap-3 group hover:shadow-glass transition-all duration-300"
                >
                  <span className="text-xl shrink-0">{cert.icon}</span>
                  <div>
                    <p className="font-body text-sm text-charcoal/80 group-hover:text-gold transition-colors duration-300">
                      {cert.name}
                    </p>
                    <p className="font-mono text-[10px] text-charcoal/50 mt-1">
                      {cert.provider}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="mt-20">
          <h3 className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="w-4 h-px bg-gold inline-block" />
            Technical Toolkit
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items], i) => (
              <div key={i} className="skill-category">
                <h4 className="font-mono text-[11px] text-charcoal/50 uppercase tracking-wider mb-4">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg font-mono text-[11px] text-charcoal/80 border border-charcoal/10 hover:border-gold/50 hover:bg-gold/10 hover:text-gold transition-all duration-300 cursor-default"
                      style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
