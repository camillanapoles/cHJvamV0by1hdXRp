import { motion } from 'framer-motion'

interface NavProps {
  current: number
  total: number
  labels: string[]
  onNavigate: (idx: number) => void
  onNext: () => void
  onPrev: () => void
}

export default function Navigation({ current, total, labels, onNavigate, onNext, onPrev }: NavProps) {
  return (
    <>
      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => onNavigate(i)}
            className="group relative flex items-center"
            aria-label={`Ir para slide ${label}`}
          >
            <motion.div
              animate={{
                width: i === current ? 32 : 8,
                backgroundColor: i === current ? '#8B5CF6' : i < current ? '#06B6D4' : '#334155',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Arrow buttons */}
      {current > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:border-accent-purple transition-all"
          aria-label="Slide anterior"
        >
          ←
        </button>
      )}
      {current < total - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:border-accent-purple transition-all"
          aria-label="Próximo slide"
        >
          →
        </button>
      )}

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-50 text-xs text-slate-500 font-mono">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </>
  )
}
