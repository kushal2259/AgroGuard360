import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { TECHVERSE_MODULES } from '../data/content.js'

const ANGLES = [-90, -30, 30, 90, 150, 210]
const RX = 38
const RY = 35

const NODES = TECHVERSE_MODULES.map((m, i) => {
  const rad = (ANGLES[i] * Math.PI) / 180
  return { ...m, x: 50 + RX * Math.cos(rad), y: 50 + RY * Math.sin(rad) }
})

export default function TechverseModules() {
  return (
    <SlideShell
      kicker="One Connected Ecosystem"
      title="THE SIX INTELLIGENCE MODULES"
      subtitle="Six systems, one autonomous platform — each named, each specialized, all connected."
    >
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {NODES.map((n, i) => (
            <motion.line
              key={n.id}
              x1={50}
              y1={50}
              x2={n.x}
              y2={n.y}
              stroke="#3d9760"
              strokeWidth={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.3, ease: 'easeOut' }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/50 bg-charcoal-900/90 shadow-[0_0_40px_rgba(214,161,60,0.25)] md:h-24 md:w-24">
            <span className="text-center font-display text-[10px] font-semibold leading-tight text-gold-300 md:text-xs">
              AGROGUARD
              <br />
              360
            </span>
          </div>
        </motion.div>

        {NODES.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.3, type: 'spring', stiffness: 240, damping: 18 }}
            className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center md:w-36"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-field-300/40 bg-charcoal-900/90 text-field-200 md:h-14 md:w-14">
              <Icon name={n.icon} size={20} />
            </div>
            <div className="font-display text-sm font-semibold text-mist-100">{n.name}</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold-400">{n.tagline}</div>
            <div className="hidden text-[10px] leading-tight text-mist-500 md:block">{n.desc}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  )
}
