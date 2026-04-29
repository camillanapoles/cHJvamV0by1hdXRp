import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AuthGate from './components/AuthGate'
import Navigation from './components/Navigation'
import Problem from './components/slides/Problem'
import Market from './components/slides/Market'
import Ecosystem from './components/slides/Ecosystem'
import Innovation from './components/slides/Innovation'
import SocialAgent from './components/slides/SocialAgent'
import Business from './components/slides/Business'
import Roadmap from './components/slides/Roadmap'

const SLIDES = [Problem, Market, Ecosystem, Innovation, SocialAgent, Business, Roadmap]
const SLIDE_LABELS = ['Desafio', 'Mercado', 'Ecossistema', 'Inovação', 'Demonstração', 'Negócio', 'Jornada']

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('auti_auth') === '1')
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => {
    if (current < SLIDES.length - 1) go(current + 1)
  }, [current, go])

  const prev = useCallback(() => {
    if (current > 0) go(current - 1)
  }, [current, go])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />

  const SlideComponent = SLIDES[current]

  return (
    <div className="relative w-screen min-h-dvh overflow-hidden bg-deep">
      {/* Particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#8B5CF6' : '#06B6D4',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50 bg-surface">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan"
          animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -100 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <Navigation
        current={current}
        total={SLIDES.length}
        labels={SLIDE_LABELS}
        onNavigate={go}
        onNext={next}
        onPrev={prev}
      />
    </div>
  )
}
