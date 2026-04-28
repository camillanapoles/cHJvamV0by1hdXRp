import { useState } from 'react'
import { motion } from 'framer-motion'

const DIMENSIONS = [
  { name: 'Velocidade MVP', weight: '15%', agents: 9, ponte: 8, plano: 3 },
  { name: 'Receita', weight: '15%', agents: 7, ponte: 8, plano: 8 },
  { name: 'Impacto Social', weight: '15%', agents: 8, ponte: 6, plano: 10 },
  { name: 'Escalabilidade', weight: '15%', agents: 9, ponte: 7, plano: 5 },
  { name: 'Regulação', weight: '10%', agents: 7, ponte: 9, plano: 3 },
  { name: 'Capital', weight: '10%', agents: 8, ponte: 7, plano: 2 },
  { name: 'Inovação', weight: '10%', agents: 9, ponte: 6, plano: 9 },
  { name: 'Sinergia', weight: '10%', agents: 9, ponte: 6, plano: 8 },
]

const SCORES = { agents: 8.25, ponte: 7.15, plano: 6.10 }

export default function Innovation() {
  const [hoveredDim, setHoveredDim] = useState<number | null>(null)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-accent-green text-sm font-semibold tracking-widest uppercase mb-3">A Inovação</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          FDC-U <span className="gradient-text">Ranking</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Framework de Decomposição Critérios Universal — scoring objetivo e reprodutível.
        </p>
      </motion.div>

      {/* Score cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mb-8"
      >
        {[
          { label: 'Agentes IA', score: SCORES.agents, color: '#8B5CF6', rank: '#1' },
          { label: 'Ponte TEA', score: SCORES.ponte, color: '#06B6D4', rank: '#2' },
          { label: 'Plano Saúde', score: SCORES.plano, color: '#F59E0B', rank: '#3' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass rounded-xl p-5 text-center min-w-[140px]"
            style={{ borderColor: item.color + '30' }}
          >
            <p className="text-xs text-slate-500 mb-1">{item.rank}</p>
            <div className="text-3xl font-bold mb-1" style={{ color: item.color }}>{item.score}</div>
            <p className="text-xs text-slate-400">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Dimension bars */}
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-5"
        >
          {/* Legend */}
          <div className="flex items-center gap-6 mb-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-accent-purple" /> Agentes IA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-accent-cyan" /> Ponte TEA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-accent-amber" /> Plano Saúde
            </span>
          </div>

          {DIMENSIONS.map((dim, i) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              onMouseEnter={() => setHoveredDim(i)}
              onMouseLeave={() => setHoveredDim(null)}
              className={`flex items-center gap-3 py-2 ${i < DIMENSIONS.length - 1 ? 'border-b border-slate-800' : ''}`}
            >
              {/* Dimension name */}
              <div className="w-36 md:w-44 shrink-0">
                <p className="text-xs text-slate-400 truncate">{dim.name}</p>
                <p className="text-[10px] text-slate-600">peso {dim.weight}</p>
              </div>

              {/* Bars */}
              <div className="flex-1 flex gap-1">
                {[
                  { val: dim.agents, color: '#8B5CF6' },
                  { val: dim.ponte, color: '#06B6D4' },
                  { val: dim.plano, color: '#F59E0B' },
                ].map((bar, j) => (
                  <div key={j} className="flex-1 h-5 bg-slate-800/50 rounded overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.val * 10}%` }}
                      transition={{ delay: 0.8 + i * 0.05 + j * 0.05, duration: 0.6 }}
                      className="h-full rounded"
                      style={{ background: bar.color, opacity: hoveredDim === i ? 1 : 0.7 }}
                    />
                    {hoveredDim === i && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                        {bar.val}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why AI wins */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 flex flex-wrap gap-3 justify-center max-w-3xl"
      >
        {[
          'Tradução social não existe globalmente',
          'MVP em 12 semanas',
          'Break-even ~200 usuários',
          'Digital puro — escala ilimitada',
        ].map((reason, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + i * 0.1 }}
            className="glass px-3 py-1.5 rounded-full text-xs text-accent-green border border-accent-green/20"
          >
            ✓ {reason}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
