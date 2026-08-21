import { motion } from 'framer-motion'

export default function SectionTitle({ kicker, title, subtitle, align = 'left', className = '' }) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl text-base text-mist-100 md:text-lg drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
