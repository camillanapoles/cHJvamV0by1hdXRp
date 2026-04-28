import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 25)
    return () => clearInterval(timer)
  }, [target])
  return <span>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
}

const SOCIAL_EXAMPLES = [
  { vague: '"Seja mais proativo"', literal: '→ Proponha 1 melhoria por semana\n→ Antecipe problemas antes que alguém peça\n→ Documente soluções que você encontrar' },
  { vague: '"Precisamos melhorar a dinâmica"', literal: '→ Participe de 2 reuniões semanais\n→ Responda msgs em até 4h\n→ Compartilhe progresso na sexta' },
  { vague: '"Bom trabalho!"', literal: '→ Seu chefe está satisfeito com a entrega\n→ Nenhuma ação necessária\n→ Continue assim' },
]

export default function Problem() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [phase, setPhase] = useState<'vague' | 'confusion' | 'translation'>('vague')

  useEffect(() => {
    setPhase('vague')
    const t1 = setTimeout(() => setPhase('confusion'), 2000)
    const t2 = setTimeout(() => setPhase('translation'), 3500)
    const t3 = setTimeout(() => {
      setExampleIdx((i) => (i + 1) % SOCIAL_EXAMPLES.length)
    }, 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [exampleIdx])

  const example = SOCIAL_EXAMPLES[exampleIdx]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <p className="text-accent-purple text-sm font-semibold tracking-widest uppercase mb-3">O Desafio</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          O <span className="gradient-text">Mundo Social</span> é Invisível
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Demandas implícitas. Expectativas não ditas. Códigos que todos "entendem" — exceto quem não consegue decifrá-los.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-4xl"
      >
        {[
          { value: 2, suffix: 'M+', label: 'Pessoas com TEA no Brasil' },
          { value: 200, suffix: '%+', label: 'Crescimento de diagnósticos (década)' },
          { value: 60, suffix: '%+', label: 'Adultos sem acesso a tecnologia' },
          { value: 3, suffix: 'B', prefix: 'R$', label: 'Mercado de TA/ano' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Interactive social translation demo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-strong rounded-2xl p-8 max-w-2xl w-full"
      >
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 text-center">
          O que a pessoa neurotípica diz vs. o que a pessoa com TEA entende
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Vague demand */}
          <motion.div
            key={`vague-${exampleIdx}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex-1 w-full p-6 rounded-xl border transition-all duration-500 ${
              phase === 'confusion' ? 'border-red-500/50 bg-red-500/5' : 'border-slate-700'
            }`}
          >
            <p className="text-xs text-slate-500 mb-2">O que dizem:</p>
            <p className="text-lg font-semibold">{example.vague}</p>
            {phase === 'confusion' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-3"
              >
                😕 "Proativo... o que exatamente?"
              </motion.p>
            )}
          </motion.div>

          {/* Arrow */}
          <motion.div
            animate={{ scale: phase === 'translation' ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-accent-purple"
          >
            {phase === 'translation' ? '✨' : '→'}
          </motion.div>

          {/* Translation */}
          <motion.div
            key={`trans-${exampleIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: phase === 'translation' ? 1 : 0, x: phase === 'translation' ? 0 : 20 }}
            className="flex-1 w-full p-6 rounded-xl border border-accent-green/30 bg-accent-green/5"
          >
            <p className="text-xs text-accent-green mb-2">Tradução literal:</p>
            <p className="text-sm whitespace-pre-line leading-relaxed">{example.literal}</p>
          </motion.div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          E se a IA pudesse fazer essa tradução automaticamente?
        </p>
      </motion.div>
    </div>
  )
}
