import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { REVENUE_STREAMS } from '../data/content.js'

export default function BusinessModel() {
  return (
    <SlideShell
      kicker="How AGROGUARD 360 Sustains Itself"
      title="BUSINESS MODEL"
      subtitle="Five revenue streams, built around how farms actually operate."
    >
      <div className="grid h-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {REVENUE_STREAMS.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            className="flex flex-col gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300">
              <Icon name={r.icon} size={18} />
            </div>
            <h3 className="font-display text-base font-semibold text-mist-100">{r.title}</h3>
            <p className="text-sm leading-relaxed text-mist-400">{r.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center">
        <StatusBadge variant="neutral">Example pricing model — figures shown for illustration only</StatusBadge>
      </div>
    </SlideShell>
  )
}
