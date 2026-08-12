import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene from '../components/scene/FarmScene.jsx'
import ScanPulse from '../components/scene/ScanPulse.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { PROBLEMS } from '../data/content.js'

const TONE = {
  disease: '#e05c5c',
  pest: '#e8b955',
  water: '#5fa8d6',
  manual: '#8fa093',
  financial: '#e05c5c',
}

export default function Problem() {
  return (
    <SlideShell
      kicker="The Reality On The Ground"
      title="THE PROBLEM"
      subtitle="Farmers often discover problems after the damage has already happened."
      background={
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <FarmScene variant="topdown" className="h-full w-full" />
        </div>
      }
    >
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-5">
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.25 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35 + i * 0.22, type: 'spring', stiffness: 260, damping: 16 }}
              className="relative flex h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: `${TONE[p.id]}22`, border: `1px solid ${TONE[p.id]}55` }}
            >
              <Icon name={p.icon} size={20} color={TONE[p.id]} />
              <div className="absolute inset-0 flex items-center justify-center">
                <ScanPulse size={44} color={TONE[p.id]} rings={1} duration={2.6} />
              </div>
            </motion.div>
            <h3 className="font-display text-lg font-semibold text-mist-100">{p.title}</h3>
            <p className="text-sm leading-relaxed text-mist-300">{p.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="mt-6 flex items-center gap-3 border-t border-mist-500/10 pt-4"
      >
        <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse-slow" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
          By the time damage is visible, the cost has already been paid.
        </p>
      </motion.div>
    </SlideShell>
  )
}
