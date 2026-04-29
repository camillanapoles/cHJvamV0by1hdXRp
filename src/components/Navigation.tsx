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
        <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-gradient-to-t from-deep/90 via-deep/60 to-transparent">
          {/* Left: current slide label */}
          <motion.span
            key={labels[current]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-base text-slate-300 font-medium min-w-[100px]"
          >
            {labels[current]}
          </motion.span>

          {/* Center: dot indicators with chevrons */}
          <div className="flex items-center gap-1">
            {/* Left chevron */}
            {current > 0 && (
              <button
                onClick={() => onNavigate(current - 1)}
                className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Slide anterior"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
            )}

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

            {/* Right chevron */}
            {current < total - 1 && (
              <button
                onClick={() => onNavigate(current + 1)}
                className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Próximo slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            )}
          </div>

          {/* Right: slide counter */}
          <span className="text-xs text-slate-500 font-mono min-w-[50px] text-right">
            {String(current + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </>
  )
}
