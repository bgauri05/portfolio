import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseEnter = () => {
      cursor.style.opacity = '1'
      trail.style.opacity = '1'
    }

    const onMouseLeave = () => {
      cursor.style.opacity = '0'
      trail.style.opacity = '0'
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        isHoveringRef.current = true
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        isHoveringRef.current = false
      }
    }

    let rafId: number
    const animate = () => {
      const lerp = 0.15
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp

      const scale = isHoveringRef.current ? 2.5 : 1
      cursor.style.transform = `translate(${posRef.current.x - 8}px, ${posRef.current.y - 8}px) scale(${scale})`
      trail.style.transform = `translate(${targetRef.current.x - 20}px, ${targetRef.current.y - 20}px)`

      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] opacity-0 transition-transform duration-200 hidden md:block"
        style={{
          background: 'radial-gradient(circle, #f2c4ce 0%, #d4889a 100%)',
          boxShadow: '0 0 12px rgba(242, 196, 206, 0.8), 0 0 24px rgba(201, 168, 76, 0.4)',
        }}
      />
    </>
  )
}
