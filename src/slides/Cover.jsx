import { motion } from 'framer-motion'
import { Radio } from 'lucide-react'
import FarmScene from '../components/scene/FarmScene.jsx'
import Drone from '../components/scene/Drone.jsx'
import GroundRobot from '../components/scene/GroundRobot.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'

function CornerHud() {
  return (
    <div className="pointer-events-none absolute inset-6 z-10 md:inset-10">
      <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-field-300/40" />
      <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-field-300/40" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-field-300/40" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-field-300/40" />
      <div className="absolute right-0 top-10 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
        <div>SECTOR 04 // FIELD-A</div>
        <div className="text-field-300/70">DRONE + ROVER ACTIVE</div>
      </div>
    </div>
  )
}

export default function Cover({ onOpenDemo, onNext }) {
  return (
    <div className="relative h-full w-full bg-charcoal-950">
      <FarmScene variant="hero" className="h-full w-full">
        {/* Foreground Large Drone */}
        <Drone timeOffset={0} depthOffset={-0.34} xOffset={200} baseScale={1.8} />
        {/* Background Left Drone */}
        <Drone timeOffset={15} depthOffset={0.55} xOffset={-500} baseScale={0.8} />
        {/* Background Right Drone */}
        <Drone timeOffset={35} depthOffset={0.5} xOffset={450} baseScale={1.1} />
      </FarmScene>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal-950/75 via-transparent to-charcoal-950/30" />

      <CornerHud />

      <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-8 pb-28 md:px-16 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex flex-wrap items-center gap-3"
        >
          <StatusBadge variant="active" pulse>
            Techverse 2026
          </StatusBadge>
          <StatusBadge variant="neutral">Virtual Farm · Simulation</StatusBadge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-display text-6xl font-bold leading-[0.95] text-mist-100 md:text-8xl"
        >
          AGROGUARD <span className="text-glow-gold text-gold-400">360</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-4 font-display text-xl text-field-200 md:text-2xl"
        >
          AI-Powered Precision Agriculture
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-3 max-w-xl text-mist-300"
        >
          See the crop. Understand the problem. Act before it&rsquo;s too late.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-gold-400 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-950 transition hover:bg-gold-300"
          >
            Enter Presentation
          </button>
          <button
            type="button"
            onClick={onOpenDemo}
            className="flex items-center gap-2 rounded-full border border-field-300/40 bg-charcoal-900/60 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-field-200 backdrop-blur transition hover:border-field-300 hover:bg-charcoal-900"
          >
            <Radio size={14} /> Run Live Demo
          </button>
        </motion.div>
      </div>
    </div>
  )
}
