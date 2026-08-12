import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import FarmScene from './scene/FarmScene.jsx'
import Drone from './scene/Drone.jsx'
import GroundRobot from './scene/GroundRobot.jsx'
import Panel from './hud/Panel.jsx'
import StatusBadge from './hud/StatusBadge.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { LIVE_DEMO_PHASES } from '../data/content.js'

const PHASE_DURATION = 3800

export default function LiveDemo({ onClose }) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return undefined
    if (index >= LIVE_DEMO_PHASES.length - 1) {
      const t = setTimeout(() => setDone(true), PHASE_DURATION)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), PHASE_DURATION)
    return () => clearTimeout(t)
  }, [index, done])

  const phase = LIVE_DEMO_PHASES[index]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-50 overflow-hidden bg-charcoal-950"
    >
      <FarmScene variant="hero" className="h-full w-full">
        <GroundRobot />
        <Drone />
      </FarmScene>
      <div className="pointer-events-none absolute inset-0 bg-charcoal-950/70" />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-mist-500/25 bg-charcoal-900/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-mist-300 hover:text-field-200"
      >
        <X size={14} /> Exit (Esc)
      </button>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <StatusBadge variant="active" pulse className="mb-6">
          Autonomous Mission · Simulation
        </StatusBadge>

        <div className="mb-8 flex w-full max-w-3xl items-center gap-1.5">
          {LIVE_DEMO_PHASES.map((p, i) => (
            <div key={p.id} className="h-1 flex-1 overflow-hidden rounded-full bg-mist-500/15">
              <motion.div
                className="h-full bg-gold-400"
                initial={{ width: '0%' }}
                animate={{ width: i < index || done ? '100%' : i === index ? '100%' : '0%' }}
                transition={{ duration: i === index && !done ? PHASE_DURATION / 1000 : 0.3, ease: 'linear' }}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl"
            >
              <Panel className="p-8 text-center">
                <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold-400">
                  Phase {phase.phase}
                </div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-field-300/40 bg-charcoal-900 text-field-200">
                  <Icon name={phase.icon} size={28} />
                </div>
                <h2 className="font-display text-2xl font-bold text-mist-100 md:text-3xl">{phase.label}</h2>
                <p className="mt-3 text-mist-300">{phase.title}</p>

                {(phase.metric || phase.stats || phase.action) && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {phase.metric && (
                      <div className="rounded-md border border-gold-400/30 bg-gold-500/10 px-4 py-2">
                        <span className="font-mono text-xs uppercase tracking-wide text-gold-300">
                          {phase.metric.label}:{' '}
                        </span>
                        <span className="font-mono text-sm font-semibold text-gold-200">{phase.metric.value}</span>
                      </div>
                    )}
                    {phase.stats?.map((s) => (
                      <div key={s.label} className="rounded-md border border-mist-500/20 bg-charcoal-800/60 px-4 py-2">
                        <span className="font-mono text-xs uppercase tracking-wide text-mist-400">{s.label}: </span>
                        <span
                          className={`font-mono text-sm font-semibold ${
                            s.tone === 'danger' ? 'text-red-300' : 'text-gold-200'
                          }`}
                        >
                          {s.value}
                        </span>
                      </div>
                    ))}
                    {phase.action && (
                      <div className="rounded-md border border-field-300/40 bg-field-500/10 px-4 py-2 font-mono text-sm font-semibold uppercase tracking-wide text-field-200">
                        {phase.action}
                      </div>
                    )}
                  </div>
                )}
              </Panel>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl text-center"
            >
              <Panel className="p-8">
                <div className="font-display text-xl font-bold uppercase tracking-wide text-gold-300 md:text-2xl">
                  AGROGUARD 360 has completed the mission
                </div>
                <p className="mt-3 text-sm text-mist-400">
                  Every phase ran autonomously — from aerial scan to market decision — without a single manual step.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-full bg-gold-400 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-950 transition hover:bg-gold-300"
                >
                  Close
                </button>
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
