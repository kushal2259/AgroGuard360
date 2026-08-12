import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { PIPELINE_STAGES } from '../data/content.js'

export default function HowItWorks() {
  const n = PIPELINE_STAGES.length
  return (
    <SlideShell
      kicker="One Autonomous Ecosystem"
      title="HOW IT WORKS"
      subtitle="A single signal flows from sky to soil to decision — no step waits on a human to notice."
    >
      <div className="flex h-full flex-col justify-center">
        <div className="relative">
          <div className="absolute left-0 right-0 top-8 h-px bg-mist-500/15 md:top-9" />
          <motion.div
            className="absolute top-8 h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(232,185,85,0.9)] md:top-9"
            animate={{ left: ['1%', '99%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ marginTop: -3 }}
          />

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-y-0">
            {PIPELINE_STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-field-300/40 bg-charcoal-900 text-field-200">
                  <Icon name={stage.icon} size={24} />
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-1 font-display text-base font-semibold text-mist-100">{stage.label}</div>
                <p className="mt-1 max-w-[9rem] text-xs leading-relaxed text-mist-400">{stage.detail}</p>
                {i < n - 1 && (
                  <div className="mt-1 hidden text-mist-600 md:block" aria-hidden>
                    &nbsp;
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
