import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Translation {
  input: string
  output: string[]
}

const PRESET_EXAMPLES = [
  'Precisamos melhorar a dinâmica da equipe',
  'Mostre proatividade',
  'Boa comunicação',
  'Bom trabalho!',
  'Seja um líder',
  'Trabalhe bem em equipe',
]

const TRANSLATIONS: Record<string, string[]> = {
  'precisamos melhorar a dinâmica da equipe': [
    '1) Participe de pelo menos 2 reuniões semanais do time',
    '2) Responda mensagens de colegas em até 4 horas',
    '3) Compartilhe seu progresso na reunião de sexta-feira',
    '4) Sugira 1 melhoria no processo por semana',
  ],
  'mostre proatividade': [
    '1) Proponha 1 melhoria por semana no seu projeto',
    '2) Antecipe problemas antes que alguém precise pedir',
    '3) Documente soluções que você encontrar para o time',
    '4) Voluntarie-se para tarefas antes que atribuam',
  ],
  'boa comunicação': [
    '1) Confirme recebimento de mensagens importantes',
    '2) Responda em até 4 horas durante horário comercial',
    '3) Use lista de pontos em mensagens longas',
    '4) Peça esclarecimento quando não entender algo',
  ],
  'bom trabalho!': [
    '→ Seu chefe está satisfeito com a entrega recente',
    '→ Nenhuma ação é necessária',
    '→ Continue mantendo o padrão atual',
  ],
  'seja um líder': [
    '1) Delegue pelo menos 1 tarefa por semana',
    '2) Faça check-in individual com cada membro semanalmente',
    '3) Dê feedback específico (o quê foi bom, não só "bom")',
    '4) Tome decisões quando o time estiver bloqueado',
  ],
  'trabalhe bem em equipe': [
    '1) Contribua em pelo menos 1 discussão por reunião',
    '2) Cumpra prazos combinados com o time',
    '3) Ofereça ajuda quando um colega estiver sobrecarregado',
    '4) Compartilhe informações relevantes proativamente',
  ],
}

function findTranslation(input: string): string[] {
  const normalized = input.toLowerCase().trim()
  // Exact match
  if (TRANSLATIONS[normalized]) return TRANSLATIONS[normalized]
  // Keyword match
  for (const [key, value] of Object.entries(TRANSLATIONS)) {
    const keywords = key.split(' ').filter(w => w.length > 3)
    if (keywords.some(k => normalized.includes(k))) return value
  }
  // Fallback generic translation
  return [
    'Analisando sua solicitação...',
    `A frase "${input}" contém termos que podem ser interpretados de múltiplas formas.`,
    '→ O Social Agent identificaria as expectativas implícitas nesta demanda',
    '→ Traduziria para tarefas específicas, mensuráveis e concretas',
    '→ Integraria com o Workflow Agent para criar um plano de ação',
  ]
}

export default function SocialAgent() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string[] | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)

  const translate = useCallback((text?: string) => {
    const value = text || input.trim()
    if (!value) return
    setIsTranslating(true)
    setResult(null)
    // Simulate AI processing delay
    setTimeout(() => {
      setResult(findTranslation(value))
      setIsTranslating(false)
    }, 800 + Math.random() * 700)
  }, [input])

  const handleExampleClick = (example: string) => {
    setInput(example)
    setIsTranslating(true)
    setResult(null)
    setTimeout(() => {
      setResult(findTranslation(example))
      setIsTranslating(false)
    }, 800 + Math.random() * 700)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 pt-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-accent-purple text-sm font-semibold tracking-widest uppercase mb-3">Demonstração</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Social <span className="gradient-text">Agent</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Digite uma demanda social e veja a IA traduzir em tarefas concretas. A inovação que não existe em nenhum produto global.
        </p>
      </motion.div>

      {/* Agent architecture mini */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-6 justify-center"
      >
        {[
          { icon: '🗣️', name: 'Social', active: true },
          { icon: '📋', name: 'Workflow', active: false },
          { icon: '🔔', name: 'Sensorial', active: false },
          { icon: '⚙️', name: 'Automation', active: false },
        ].map((agent) => (
          <div
            key={agent.name}
            className={`glass px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all ${
              agent.active ? 'border-accent-purple text-accent-purple' : 'text-slate-600'
            }`}
          >
            {agent.icon} {agent.name} Agent
          </div>
        ))}
      </motion.div>

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="glass-strong rounded-xl p-6">
          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && translate()}
              placeholder="Digite uma demanda social..."
              className="flex-1 px-4 py-3 bg-surface border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-all text-sm"
            />
            <button
              onClick={() => translate()}
              disabled={isTranslating || !input.trim()}
              className="px-5 py-3 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {isTranslating ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⟳</motion.span>
              ) : 'Traduzir'}
            </button>
          </div>

          {/* Preset examples */}
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESET_EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExampleClick(ex)}
                className="px-3 py-1 text-xs glass rounded-full text-slate-400 hover:text-white hover:border-accent-purple transition-all"
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {isTranslating && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-slate-500 text-sm"
              >
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⟳</motion.span>
                Social Agent analisando...
              </motion.div>
            )}
            {result && !isTranslating && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-xs text-accent-green font-semibold">Tradução concluída</span>
                </div>
                {result.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-accent-green/5 border border-accent-green/10"
                  >
                    <span className="text-accent-green text-xs mt-0.5">✓</span>
                    <span className="text-sm text-slate-200">{line}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-slate-600 text-xs text-center mt-4 max-w-md"
      >
        Demonstração local. Em produção, o Social Agent usa Claude API via LangGraph para traduções nuanceadas e personalizadas ao perfil do usuário.
      </motion.p>
    </div>
  )
}
