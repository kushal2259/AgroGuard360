const VARIANTS = {
  simulation: 'border-gold-400/40 text-gold-300 bg-gold-500/10',
  demo: 'border-gold-400/40 text-gold-300 bg-gold-500/10',
  live: 'border-field-300/40 text-field-200 bg-field-500/10',
  active: 'border-field-300/50 text-field-200 bg-field-500/15',
  warning: 'border-red-400/40 text-red-300 bg-red-500/10',
  neutral: 'border-mist-500/30 text-mist-300 bg-charcoal-800/60',
}

export default function StatusBadge({ children = 'SIMULATION', variant = 'simulation', pulse = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${VARIANTS[variant] || VARIANTS.simulation} ${className}`}
    >
      {pulse && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-slow" />}
      {children}
    </span>
  )
}
