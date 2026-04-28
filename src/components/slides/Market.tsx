import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.max(1, Math.ceil(target / 50))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 30)
    return () => clearInterval(timer)
  }, [target])
  return <span>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
}

const RED_OCEAN = [
  { name: 'Chatbots genéricos', issue: 'Reativo, sem adaptação neurodivergente' },
  { name: 'Apps de produtividade', issue: 'Interface complexa, sem tradução social' },
  { name: 'Brain in Hand (UK)', issue: 'Foco em ansiedade, não produtividade' },
  { name: 'Proloquo2Go', issue: 'CAA para não-verbais, não cognição social' },
]

const BLUE_OCEAN = [
  { name: 'Tradução Social Autônoma', desc: 'Converte demandas implícitas em tarefas concretas' },
  { name: 'Agentes Proativos', desc: 'Agem sem solicitação — filtram, traduzem, organizam' },
  { name: 'SSOT Familiar', desc: 'Pessoa + família + terapeuta + empregador conectados' },
  { name: 'Ecossistema 3 Camadas', desc: 'IA + Empregabilidade + Saúde integrados' },
]

export default function Market() {
  const [mode, setMode] = useState<'red' | 'blue'>('red')

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <p className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-3">O Mercado</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Oceano <span className="gradient-text">{mode === 'red' ? 'Vermelho' : 'Azul'}</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          {mode === 'red'
            ? 'Soluções existentes não atendem a necessidade real. Redeslotado e genérico.'
            : 'Ninguém no Brasil (ou globalmente) oferece IA que traduz o mundo social.'}
        </p>
      </motion.div>

      {/* Toggle */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setMode('red')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Red Ocean
        </button>
        <button
          onClick={() => setMode('blue')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'blue' ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Blue Ocean
        </button>
      </div>

      {/* Market stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 w-full max-w-4xl"
      >
        {[
          { v: 15, s: '-20%', l: 'Crescimento TA/ano' },
          { v: 2, s: '-3B', p: 'R$', l: 'Mercado brasileiro' },
          { v: 85, s: '-95%', l: 'Custo que podemos reduzir' },
          { v: 750, s: 'K+', l: 'Adultos TEA nível 1-2' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">
              <AnimatedCounter target={stat.v} suffix={stat.s} prefix={stat.p || ''} />
            </div>
            <p className="text-slate-500 text-xs">{stat.l}</p>
          </div>
        ))}
      </motion.div>

      {/* Comparison cards */}
      <div className="w-full max-w-4xl">
        <motion.div layout className="grid md:grid-cols-2 gap-4">
          {mode === 'red' ? RED_OCEAN.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-4 border-l-2 border-red-500/50"
            >
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-slate-400 text-xs mt-1">{item.issue}</p>
            </motion.div>
          )) : BLUE_OCEAN.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-4 border-l-2 border-accent-cyan"
            >
              <p className="font-semibold text-sm text-accent-cyan">{item.name}</p>
              <p className="text-slate-300 text-xs mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Blue Ocean formula */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 glass rounded-xl p-4 max-w-3xl text-center"
      >
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Fórmula Blue Ocean</p>
        <p className="text-sm text-slate-300 font-mono">
          <span className="text-accent-green">IA tradução social</span> +
          <span className="text-accent-purple"> SSOT familiar</span> +
          <span className="text-accent-cyan"> ecossistema integrado</span> −
          <span className="text-red-400"> concorrência</span> =
          <span className="text-accent-amber font-bold"> OCEANO AZUL</span>
        </p>
      </motion.div>
    </div>
  )
}
