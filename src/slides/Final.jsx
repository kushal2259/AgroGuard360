import { motion } from 'framer-motion'
import { Radio, RotateCcw } from 'lucide-react'
import FarmScene from '../components/scene/FarmScene.jsx'
import Drone from '../components/scene/Drone.jsx'
import GroundRobot from '../components/scene/GroundRobot.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'

export default function Final({ onOpenDemo, onRestart }) {
  return (
    <div className="relative h-full w-full bg-charcoal-950">
      <FarmScene variant="hero" className="h-full w-full">
        <GroundRobot />
        <Drone />
      </FarmScene>

      <div className="pointer-events-none absolute inset-0 bg-charcoal-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-6">
          <StatusBadge variant="active" pulse>
            Mission Complete
          </StatusBadge>
        </motion.div>

        <div className="font-display text-2xl font-semibold leading-tight text-mist-100 md:text-4xl">
          {['DETECT EARLY.', 'INSPECT PRECISELY.', 'DECIDE PROFITABLY.'].map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
            >
              {line}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8"
        >
          <div className="font-display text-4xl font-bold text-gold-400 text-glow-gold md:text-5xl">AGROGUARD 360</div>
          <div className="mt-2 text-field-200">AI-Powered Precision Agriculture</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-mist-500">Techverse 2026</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onOpenDemo}
            className="flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-950 transition hover:bg-gold-300"
          >
            <Radio size={14} /> Run Live Demo Again
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-2 rounded-full border border-field-300/40 bg-charcoal-900/60 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-field-200 backdrop-blur transition hover:border-field-300 hover:bg-charcoal-900"
          >
            <RotateCcw size={14} /> Restart Presentation
          </button>
        </motion.div>
      </div>
    </div>
  )
}
