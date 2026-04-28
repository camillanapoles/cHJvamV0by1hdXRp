import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOKEN = 'NEURO2026'

export default function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim().toUpperCase() === TOKEN) {
      sessionStorage.setItem('auti_auth', '1')
      onAuth()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setInput('')
    }
  }

  return (
    <div className="w-screen h-screen bg-deep flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.08), transparent)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(6,182,212,0.06), transparent)'
                : 'radial-gradient(circle, rgba(245,158,11,0.04), transparent)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 glass-strong rounded-2xl p-10 w-full max-w-md mx-4"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl mb-4 inline-block"
            >
              🧠
            </motion.div>
            <h1 className="text-2xl font-bold gradient-text mb-2">Projeto Auti</h1>
            <p className="text-slate-400 text-sm">Tecnologia para Neurodivergência</p>
          </div>

          {/* Token input */}
          <motion.form
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-slate-400 mb-2">Token de acesso</label>
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false) }}
                placeholder="Digite o token..."
                className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                autoFocus
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  Token inválido. Tente novamente.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-lg font-semibold text-white hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              Acessar apresentação
            </button>
          </motion.form>

          <p className="text-slate-600 text-xs text-center mt-6">
            Conteúdo confidencial • Requer autorização
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
