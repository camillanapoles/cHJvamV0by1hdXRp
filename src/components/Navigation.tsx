import { motion } from 'framer-motion'

interface NavProps {
  current: number
  total: number
  labels: string[]
  onNavigate: (idx: number) => void
}

export default function Navigation({ current, total, labels, onNavigate }: NavProps) {
  return (
    <>
      {/* Bottom navigation bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-center px-4 md:px-8 py-4 bg-gradient-to-t from-deep/90 via-deep/60 to-transparent">
          {/* Center: dot indicators with prominent chevrons */}
          <div className="flex items-center gap-2">
            {/* Left chevron */}
            <button
              onClick={() => current > 0 && onNavigate(current - 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                current > 0
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-accent-purple/20 hover:text-accent-purple active:scale-90'
                  : 'text-slate-700 cursor-default'
              }`}
              aria-label="Slide anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            <div className="flex items-center gap-1">
              {labels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => onNavigate(i)}
                  className="group relative flex items-center px-0.5"
                  aria-label={`Ir para ${label}`}
                >
                  <motion.div
                    animate={{
                      width: i === current ? 28 : 8,
                      backgroundColor: i === current ? '#8B5CF6' : i < current ? '#06B6D4' : '#475569',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                  />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Right chevron */}
            <button
              onClick={() => current < total - 1 && onNavigate(current + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                current < total - 1
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-accent-purple/20 hover:text-accent-purple active:scale-90'
                  : 'text-slate-700 cursor-default'
              }`}
              aria-label="Próximo slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
