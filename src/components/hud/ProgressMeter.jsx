import { motion } from 'framer-motion'

const BAR_COLORS = {
  field: 'bg-field-400',
  gold: 'bg-gold-400',
  danger: 'bg-red-400',
  mist: 'bg-mist-300',
}

export default function ProgressMeter({ label, value, max = 100, unit = '%', accent = 'field', className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-mist-500">
        <span>{label}</span>
        <span className="text-mist-300">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-charcoal-600">
        <motion.div
          className={`h-full rounded-full ${BAR_COLORS[accent] || BAR_COLORS.field}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
