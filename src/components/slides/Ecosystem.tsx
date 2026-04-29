import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LAYERS = [
  {
    id: 1,
    name: 'Agentes IA Autônomos',
    score: 8.25,
    color: '#8B5CF6',
    timing: 'Meses 1-6',
    tagline: 'Core Tecnológico',
    details: [
      'Social Agent — traduz demandas sociais em tarefas concretas',
      'Workflow Agent — estrutura o dia, integra calendários',
      'Sensorial Agent — monitora e filtra estímulos',
      'Automation Agent — executa tarefas repetitivas',
      'SSOT — hub central: pessoa + família + terapeuta + empregador',
    ],
    stack: 'LangGraph + Claude API + React Native + PostgreSQL',
    mvp: '12 semanas • R$ 200-400K',
  },
  {
    id: 2,
    name: 'Ponte TEA',
    score: 7.15,
    color: '#06B6D4',
    timing: 'Meses 6-18',
    tagline: 'Motor de Receita B2B',
    details: [
      'Assessment vocacional gamificado',
      'Matching TEA ↔ empresas com IA',
      'Simulador de entrevista com feedback',
      'Coaching de acompanhamento 90 dias',
      'Dashboard de inclusão para RH',
    ],
    stack: 'React Native + Node.js + OpenAI API',
    mvp: '12 semanas • R$ 200-400K',
  },
  {
    id: 3,
    name: 'Plano Saúde Neurodivergente',
    score: 6.10,
    color: '#F59E0B',
    timing: 'Meses 18+',
    tagline: 'Impacto Social Máximo',
    details: [
      'Bundle integrado: terapia + ABA + OT + fono',
      'Modelo cooperativo (Uniodonto/Unimed precedent)',
      'Reduz custo de terapia 85-95%',
      'Suporte familiar e psicoeducação',
      'Rede credenciada especializada em TEA',
    ],
    stack: 'Plataforma digital + rede profissional',
    mvp: '9-12 meses • R$ 550K-1.1M',
  },
]

export default function Ecosystem() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 pt-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <p className="text-accent-amber text-sm font-semibold tracking-widest uppercase mb-3">A Solução</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Ecossistema <span className="gradient-text">3 Camadas</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          3 protótipos complementares conectados por SSOT. Não são concorrentes — são camadas de um mesmo ecossistema.
        </p>
      </motion.div>

      {/* 3D Layer visualization */}
      <div className="relative w-full max-w-4xl mb-8" style={{ perspective: '1000px' }}>
        <div className="flex flex-col gap-3" style={{ transformStyle: 'preserve-3d' }}>
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              onClick={() => setSelected(selected === layer.id ? null : layer.id)}
              className="cursor-pointer"
              style={{ transform: `translateZ(${-i * 10}px)` }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className={`glass rounded-xl p-5 transition-all duration-300 ${
                  selected === layer.id ? 'ring-2' : ''
                }`}
                style={{
                  borderColor: selected === layer.id ? layer.color : undefined,
                  boxShadow: selected === layer.id ? `0 0 30px ${layer.color}25` : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{ background: `${layer.color}20`, color: layer.color }}
                    >
                      {layer.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: layer.color }}>{layer.name}</h3>
                      <p className="text-slate-500 text-xs">{layer.tagline} • {layer.timing}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: layer.color }}>{layer.score}</div>
                    <p className="text-slate-600 text-xs">FDC-U Score</p>
                  </div>
                </div>

                {/* Score bar */}
                <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${layer.score * 10}%` }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${layer.color}80, ${layer.color})` }}
                  />
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {selected === layer.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <ul className="space-y-2 mb-4">
                          {layer.details.map((d, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05 }}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <span style={{ color: layer.color }}>▸</span>
                              {d}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 text-xs">
                          <span className="glass px-3 py-1 rounded-full text-slate-400">{layer.stack}</span>
                          <span className="glass px-3 py-1 rounded-full text-accent-green">{layer.mvp}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Synergy note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-slate-500 text-xs text-center max-w-lg"
      >
        Clique em cada camada para expandir detalhes. O SSOT conecta todas as camadas — dados compartilhados entre pessoa, família, terapeuta e empregador.
      </motion.p>
    </div>
  )
}
