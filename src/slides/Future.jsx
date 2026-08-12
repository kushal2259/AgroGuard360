import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { ROADMAP_STAGES } from '../data/content.js'

export default function Future() {
  return (
    <SlideShell
      kicker="What Comes Next"
      title="FROM VIRTUAL PROTOTYPE TO REAL HARDWARE"
      subtitle="Every system on this stage is built to run on physical hardware — the roadmap already exists."
    >
      <div className="flex h-full flex-col justify-center">
        <div className="relative">
          <div className="absolute left-0 right-0 top-8 h-px bg-mist-500/15" />
          <motion.div
            className="absolute left-0 top-8 h-px bg-gold-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, delay: 0.4, ease: 'easeInOut' }}
          />

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
            {ROADMAP_STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.28 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-charcoal-900 text-gold-300">
                  <Icon name={stage.icon} size={22} />
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                  Stage {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-1 font-display text-sm font-semibold text-mist-100">{stage.title}</div>
                <p className="mt-1 max-w-[9rem] text-xs leading-relaxed text-mist-400">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
