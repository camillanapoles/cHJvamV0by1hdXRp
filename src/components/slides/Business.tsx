import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Scenario = 'conservador' | 'moderado' | 'otimista'

const SCENARIOS: Record<Scenario, {
  users: number; mrr: string; arr: string; label: string; color: string
  revenue: { source: string; monthly: string; bar: number; color: string }[]
  totalAno3: string
  breakEven: string
  ltv: string
}> = {
  conservador: {
    users: 500, mrr: 'R$ 35K', arr: 'R$ 420K', label: 'Conservador', color: '#06B6D4',
    revenue: [
      { source: 'B2C Agentes IA', monthly: 'R$ 5-15K', bar: 15, color: '#8B5CF6' },
      { source: 'B2B Ponte TEA', monthly: 'R$ 20-50K', bar: 35, color: '#06B6D4' },
      { source: 'B2C Ponte TEA', monthly: 'R$ 5-10K', bar: 10, color: '#06B6D4' },
      { source: 'Mensalidades Plano Saúde', monthly: 'R$ 30-80K', bar: 45, color: '#F59E0B' },
    ],
    totalAno3: 'R$ 500K-1.5M',
    breakEven: '200 users',
    ltv: 'R$ 500-1.5K',
  },
  moderado: {
    users: 2000, mrr: 'R$ 140K', arr: 'R$ 1.7M', label: 'Moderado', color: '#8B5CF6',
    revenue: [
      { source: 'B2C Agentes IA', monthly: 'R$ 20-50K', bar: 30, color: '#8B5CF6' },
      { source: 'B2B Ponte TEA', monthly: 'R$ 50-100K', bar: 55, color: '#06B6D4' },
      { source: 'B2C Ponte TEA', monthly: 'R$ 10-30K', bar: 20, color: '#06B6D4' },
      { source: 'Mensalidades Plano Saúde', monthly: 'R$ 100-250K', bar: 80, color: '#F59E0B' },
    ],
    totalAno3: 'R$ 2-5M',
    breakEven: '150 users',
    ltv: 'R$ 800-2K',
  },
  otimista: {
    users: 5000, mrr: 'R$ 350K', arr: 'R$ 4.2M', label: 'Otimista', color: '#10B981',
    revenue: [
      { source: 'B2C Agentes IA', monthly: 'R$ 50-120K', bar: 50, color: '#8B5CF6' },
      { source: 'B2B Ponte TEA', monthly: 'R$ 150-300K', bar: 80, color: '#06B6D4' },
      { source: 'B2C Ponte TEA', monthly: 'R$ 30-80K', bar: 35, color: '#06B6D4' },
      { source: 'Mensalidades Plano Saúde', monthly: 'R$ 300-600K', bar: 95, color: '#F59E0B' },
    ],
    totalAno3: 'R$ 5-12M',
    breakEven: '100 users',
    ltv: 'R$ 1-3K',
  },
}

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.max(1, Math.ceil(target / 40))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 25)
    return () => clearInterval(timer)
  }, [target])
  return <span>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
}

export default function Business() {
  const [scenario, setScenario] = useState<Scenario>('moderado')
  const data = SCENARIOS[scenario]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 pt-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-accent-amber text-sm font-semibold tracking-widest uppercase mb-3">O Negócio</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Modelo de <span className="gradient-text">Receita</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Break-even em ~200 usuários (mês 6-9). Receita recorrente multi-camada.
        </p>
      </motion.div>

      {/* Scenario selector */}
      <div className="flex gap-2 mb-8">
        {(Object.entries(SCENARIOS) as [Scenario, typeof SCENARIOS[Scenario]][]).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              scenario === key
                ? 'text-white border'
                : 'text-slate-500 hover:text-slate-300 border border-transparent'
            }`}
            style={scenario === key ? { borderColor: s.color, background: s.color + '15' } : {}}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main projection card */}
      <motion.div
        key={scenario}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-8 w-full max-w-3xl mb-6"
      >
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-xs text-slate-500 mb-1">Usuários (Ano 1)</p>
            <div className="text-3xl font-bold" style={{ color: data.color }}>
              <AnimatedCounter target={data.users} suffix="+" />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">MRR</p>
            <div className="text-3xl font-bold" style={{ color: data.color }}>
              {data.mrr}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">ARR</p>
            <div className="text-3xl font-bold" style={{ color: data.color }}>
              {data.arr}
            </div>
          </div>
        </div>

        {/* Revenue bar */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-3">Receita por camada (Ano 3)</p>
          <div className="space-y-2">
            {data.revenue.map((stream, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-40 truncate">{stream.source}</span>
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stream.bar}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: stream.color }}
                  />
                </div>
                <span className="text-xs font-mono w-24 text-right" style={{ color: stream.color }}>
                  {stream.monthly}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-700/50">
            <span className="text-xs text-white font-semibold w-40">Total Ano 3</span>
            <div className="flex-1" />
            <span className="text-sm font-bold gradient-text">{data.totalAno3}</span>
          </div>
        </div>
      </motion.div>

      {/* Key metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl"
      >
        {[
          { label: 'Break-even', value: data.breakEven, icon: '📈' },
          { label: 'Pricing B2C', value: 'R$ 49-149/mês', icon: '💳' },
          { label: 'Pricing B2B', value: 'R$ 500-2K/mês', icon: '🏢' },
          { label: 'LTV estimado', value: data.ltv, icon: '💰' },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="glass rounded-xl p-3 text-center"
          >
            <span className="text-lg">{m.icon}</span>
            <p className="text-sm font-semibold text-white mt-1">{m.value}</p>
            <p className="text-slate-500 text-xs">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
