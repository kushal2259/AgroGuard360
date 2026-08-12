import { motion } from 'framer-motion'

export default function ScanPulse({ size = 48, color = '#5fb87e', rings = 2, duration = 2.2, className = '', style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ overflow: 'visible', ...style }}
    >
      {Array.from({ length: rings }).map((_, i) => (
        <motion.circle
          key={i}
          cx={50}
          cy={50}
          fill="none"
          stroke={color}
          strokeWidth={3}
          initial={{ r: 8, opacity: 0.8 }}
          animate={{ r: [8, 48], opacity: [0.8, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            delay: (i * duration) / rings,
            ease: 'easeOut',
          }}
        />
      ))}
      <circle cx={50} cy={50} r={4} fill={color} />
    </svg>
  )
}
