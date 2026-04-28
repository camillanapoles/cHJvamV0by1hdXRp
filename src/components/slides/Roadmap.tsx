import { motion } from 'framer-motion'

const PHASES = [
  {
    phase: 'Fase 1',
    name: 'Foundation',
    period: 'Meses 1-6',
    color: '#8B5CF6',
    items: ['MVP Agentes IA (Social + Workflow)', 'App SSOT + WhatsApp', '50 usuários beta', 'Validação: NPS > 40'],
    investment: 'R$ 200-400K',
  },
  {
    phase: 'Fase 2',
    name: 'Revenue',
    period: 'Meses 6-18',
    color: '#06B6D4',
    items: ['Módulo Ponte TEA no app', '10 empresas parceiras B2B', 'Dashboard inclusão + coaching', 'Receita: R$ 5-20K/mês'],
    investment: 'R$ 300-600K',
  },
  {
    phase: 'Fase 3',
    name: 'Scale',
    period: 'Meses 18-30',
    color: '#10B981',
    items: ['500+ usuários, 50+ empresas', 'Agentes completos (4/4)', '100+ adultos TEA empregados', 'Receita: R$ 50-100K/mês'],
    investment: 'R$ 500K-1M',
  },
  {
    phase: 'Fase 4',
    name: 'Impact',
    period: 'Meses 30+',
    color: '#F59E0B',
    items: ['Plano Saúde Neurodivergente', 'Rede credenciada em 1 cidade', '50 famílias piloto', 'Receita: R$ 100-250K/mês'],
    investment: 'R$ 2-5M',
  },
]

const NEXT_STEPS = [
  { action: '50 entrevistas de validação', timeline: '4 semanas', priority: 'CRÍTICA' },
  { action: 'Protótipo low-fi Social Agent', timeline: '2 semanas', priority: 'ALTA' },
  { action: 'Candidatura FINEP/SEBRAE', timeline: '4 semanas', priority: 'ALTA' },
  { action: 'MVP funcional Android', timeline: '12 semanas', priority: 'ALTA' },
]

export default function Roadmap() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-3">A Jornada</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Próximos <span className="gradient-text">Passos</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Roadmap de 4 fases. Cada camada alimenta a próxima.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="w-full max-w-4xl mb-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800" />

          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="relative flex gap-4 mb-4 last:mb-0"
            >
              {/* Dot */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 text-sm font-bold"
                style={{ background: phase.color + '20', color: phase.color, border: `2px solid ${phase.color}40` }}
              >
                {i + 1}
              </div>

              {/* Content */}
              <div className="glass rounded-xl p-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: phase.color }}>
                      {phase.phase}: {phase.name}
                    </h3>
                    <p className="text-slate-500 text-xs">{phase.period}</p>
                  </div>
                  <span className="text-xs glass px-2 py-1 rounded-full text-slate-400">
                    {phase.investment}
                  </span>
                </div>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span style={{ color: phase.color }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Immediate next steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-3xl glass-strong rounded-xl p-6"
      >
        <h3 className="text-sm font-semibold mb-4 text-white">Ações imediatas (30 dias)</h3>
        <div className="space-y-2">
          {NEXT_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface/50 transition-colors"
            >
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  step.priority === 'CRÍTICA'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-accent-purple/20 text-accent-purple'
                }`}
              >
                {step.priority}
              </span>
              <span className="text-sm text-slate-300 flex-1">{step.action}</span>
              <span className="text-xs text-slate-500">{step.timeline}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-center"
      >
        <p className="text-lg font-semibold gradient-text mb-2">
          Vamos construir juntos?
        </p>
        <p className="text-slate-500 text-xs">
          Tecnologia que traduz o mundo social para neurodivergentes
        </p>
      </motion.div>
    </div>
  )
}
