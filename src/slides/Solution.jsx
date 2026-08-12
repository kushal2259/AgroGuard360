import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { SOLUTION_COMPONENTS } from '../data/content.js'

const ANGLES = [-90, -18, 54, 126, 198]
const RX = 37
const RY = 34

const NODES = SOLUTION_COMPONENTS.map((c, i) => {
  const rad = (ANGLES[i] * Math.PI) / 180
  return { ...c, x: 50 + RX * Math.cos(rad), y: 50 + RY * Math.sin(rad) }
})

export default function Solution() {
  return (
    <SlideShell
      kicker="The Answer"
      title="ONE SYSTEM. COMPLETE FARM INTELLIGENCE."
      subtitle="Observe. Understand. Inspect. Measure. Decide — one connected loop, running continuously."
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
              strokeWidth={0.35}
              strokeDasharray="2 1.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.35, ease: 'easeOut' }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-400/50 bg-charcoal-900/90 shadow-[0_0_40px_rgba(214,161,60,0.25)] md:h-28 md:w-28">
            <span className="text-center font-display text-xs font-semibold leading-tight text-gold-300 md:text-sm">
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
            transition={{ duration: 0.5, delay: 0.7 + i * 0.35, type: 'spring', stiffness: 240, damping: 18 }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-field-300/40 bg-charcoal-900/90 text-field-200 md:h-[4.5rem] md:w-[4.5rem]">
              <Icon name={n.icon} size={26} />
            </div>
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">{n.action}</div>
              <div className="font-display text-sm font-semibold text-mist-100">{n.label}</div>
              <div className="hidden max-w-[9rem] text-[11px] text-mist-500 md:block">{n.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  )
}
