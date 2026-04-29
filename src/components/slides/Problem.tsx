import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  {
    vague: '"Seja mais proativo"',
    who: 'Gestor',
    confusion: '"Proativo... o que exatamente eu deveria fazer diferente?"',
    thoughtBubble: [
      'proativo... fazer o que?',
      'estou fazendo algo errado?',
      'não entendi o que ele quer...',
    ],
    literal: [
      'Proponha 1 melhoria por semana no seu projeto',
      'Antecipe problemas antes que alguém precise pedir',
      'Documente soluções que você encontrar para o time',
    ],
  },
  {
    vague: '"Precisamos melhorar a dinâmica da equipe"',
    who: 'Coordenador',
    confusion: '"Dinâmica? Estamos trabalhando normalmente... o que mudou?"',
    thoughtBubble: [
      'dinâmica... o que é isso?',
      'fiz algo que desagradou?',
      'devo perguntar? será constrangedor?',
    ],
    literal: [
      'Participe de pelo menos 2 reuniões semanais do time',
      'Responda mensagens de colegas em até 4 horas',
      'Compartilhe seu progresso na reunião de sexta-feira',
      'Sugira 1 melhoria no processo por semana',
    ],
  },
  {
    vague: '"Bom trabalho!"',
    who: 'Chefe',
    confusion: '"Trabalho bom... mas estava bom antes também? Devo mudar algo?"',
    thoughtBubble: [
      'bom trabalho... sério?',
      'devo ter feito mais?',
      'isso é elogio ou alerta?',
    ],
    literal: [
      'Seu chefe está satisfeito com a entrega recente',
      'Nenhuma ação é necessária agora',
      'Continue mantendo o padrão atual',
    ],
  },
]

export default function Problem() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'vague' | 'thinking' | 'pause' | 'translation'>('idle')
  const [visibleLines, setVisibleLines] = useState(0)
  const [visibleThoughts, setVisibleThoughts] = useState(0)

  useEffect(() => {
    setPhase('idle')
    setVisibleLines(0)
    setVisibleThoughts(0)
    // Pause before starting
    const t0 = setTimeout(() => setPhase('vague'), 1000)
    // Let the message sink in, then show thinking
    const t1 = setTimeout(() => setPhase('thinking'), 4500)
    // Pause to feel the weight of the confusion
    const t2 = setTimeout(() => setPhase('pause'), 9500)
    // Then the translation arrives
    const t3 = setTimeout(() => {
      setPhase('translation')
      setVisibleLines(0)
    }, 11000)
    // Next example
    const t4 = setTimeout(() => {
      setExampleIdx((i) => (i + 1) % SOCIAL_EXAMPLES.length)
    }, 17000)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [exampleIdx])

  // Stagger thought bubbles
  useEffect(() => {
    if (phase !== 'thinking' || visibleThoughts >= SOCIAL_EXAMPLES[exampleIdx].thoughtBubble.length) return
    const t = setTimeout(() => setVisibleThoughts((v) => v + 1), 1200)
    return () => clearTimeout(t)
  }, [phase, visibleThoughts, exampleIdx])

  // Stagger translation lines
  useEffect(() => {
    if (phase !== 'translation' || visibleLines >= SOCIAL_EXAMPLES[exampleIdx].literal.length) return
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 800)
    return () => clearTimeout(t)
  }, [phase, visibleLines, exampleIdx])

  const example = SOCIAL_EXAMPLES[exampleIdx]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 pt-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <p className="text-accent-purple text-sm font-semibold tracking-widest uppercase mb-3">O Desafio</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          O <span className="gradient-text">Mundo Social</span> é Invisível
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Demandas implícitas. Expectativas não ditas. Códigos que todos &quot;entendem&quot; — exceto quem não consegue decifrá-los.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full max-w-4xl"
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

      {/* Chat-style dialogue simulation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-slate-600 font-mono ml-1">conversa.real</span>
        </div>

        <div className="glass-strong rounded-2xl p-6 space-y-4">
          {/* Neurotypical message (left bubble) */}
          <AnimatePresence>
            {(phase === 'vague' || phase === 'thinking' || phase === 'pause' || phase === 'translation') && (
              <motion.div
                key={`vague-${exampleIdx}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0 border border-slate-600">
                  👔
                </div>
                <div className="max-w-[80%]">
                  <p className="text-[10px] text-slate-500 mb-1">{example.who}</p>
                  <div className="bg-slate-700/80 rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-sm text-slate-200">{example.vague}</p>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1 ml-1">agora</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subconscious thoughts (thinking + pause phases) */}
          <AnimatePresence>
            {(phase === 'thinking' || phase === 'pause') && (
              <motion.div
                key={`thinking-${exampleIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase === 'pause' ? 0.3 : 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-start gap-3 flex-row-reverse"
              >
                <div className="w-9 h-9 rounded-full bg-accent-purple/20 flex items-center justify-center text-sm shrink-0 border border-accent-purple/30">
                  🧩
                </div>
                <div className="max-w-[80%] flex flex-col items-end">
                  <p className="text-[10px] text-accent-purple/70 mb-1 tracking-wide">subconsciente</p>
                  <div className="space-y-1.5">
                    {example.thoughtBubble.slice(0, visibleThoughts).map((thought, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: phase === 'pause' ? 0.4 : 0.85, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-red-500/8 border border-red-500/15 rounded-xl rounded-tr-sm px-3 py-2"
                      >
                        <p className="text-xs text-red-300/80 italic leading-relaxed">{thought}</p>
                      </motion.div>
                    ))}
                    {phase === 'thinking' && visibleThoughts < example.thoughtBubble.length && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-xs text-red-400/40 ml-4 italic"
                      >
                        ...
                      </motion.span>
                    )}
                  </div>
                  {phase === 'pause' && (
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="text-[10px] text-slate-600 mt-2 mr-1 italic"
                    >
                      processando...
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Translation (center, special style) */}
          <AnimatePresence>
            {phase === 'translation' && (
              <motion.div
                key={`trans-${exampleIdx}`}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Divider with AI label */}
                <div className="flex items-center gap-3 w-full mb-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-purple/40" />
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="text-accent-purple text-xs"
                    >
                      ⚙️
                    </motion.span>
                    <span className="text-[10px] text-accent-purple font-semibold tracking-wider">SOCIAL AGENT</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-purple/40" />
                </div>

                {/* Translation card */}
                <div className="w-full bg-gradient-to-br from-accent-purple/5 to-accent-cyan/5 border border-accent-purple/20 rounded-xl p-5">
                  <p className="text-xs text-accent-purple font-semibold mb-3 uppercase tracking-wider">
                    Tradução literal:
                  </p>
                  <div className="space-y-2">
                    {example.literal.slice(0, visibleLines).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-accent-green text-xs mt-0.5 shrink-0">
                          {i + 1}.
                        </span>
                        <span className="text-sm text-slate-200">{line}</span>
                      </motion.div>
                    ))}
                    {visibleLines < example.literal.length && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-xs text-slate-500 ml-5"
                      >
                        ▎
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {SOCIAL_EXAMPLES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === exampleIdx ? 24 : 6,
                backgroundColor: i === exampleIdx ? '#8B5CF6' : i < exampleIdx ? '#06B6D4' : '#334155',
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
