import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useLoopFrame } from '../../hooks/useLoopFrame.js'
import { VP, projectHero, depthEase } from './fieldGeometry.js'
import ScanPulse from './ScanPulse.jsx'

// Parametric patrol path: an elongated figure-eight that sweeps over the
// crop field, expressed as a bottom-edge x position + a depth fraction so it
// composites correctly with the field's perspective projection.
function flightSample(t) {
  const speed = 0.16
  const a = t * speed
  const xBottom = VP.x + 640 * Math.sin(a)
  const depth = 0.34 + 0.24 * Math.sin(a * 2)
  const { x, y, scale } = projectHero(xBottom, depthEase(depth))

  const da = 0.01
  const nextXBottom = VP.x + 640 * Math.sin(a + da)
  const nextDepth = 0.34 + 0.24 * Math.sin((a + da) * 2)
  const next = projectHero(nextXBottom, depthEase(nextDepth))

  const dx = next.x - x
  const dy = next.y - y
  const heading = (Math.atan2(dy, dx) * 180) / Math.PI
  const bank = Math.max(-22, Math.min(22, (dx > 0 ? 1 : -1) * Math.abs(dy) * 0.9))
  const bob = Math.sin(t * 1.8) * 4

  return { x, y: y - 90 * scale + bob, scale, heading, bank }
}

export default function Drone({ active = true, className = '' }) {
  const x = useMotionValue(800)
  const y = useMotionValue(300)
  const scale = useMotionValue(0.6)
  const bank = useMotionValue(0)
  const shadowX = useMotionValue(800)
  const shadowY = useMotionValue(600)
  const shadowScale = useMotionValue(0.5)
  const [scanning, setScanning] = useState(false)
  const [scanPos, setScanPos] = useState({ x: 800, y: 600 })

  useLoopFrame((_dt, t) => {
    const s = flightSample(t)
    x.set(s.x)
    y.set(s.y)
    scale.set(s.scale)
    bank.set(s.bank)
    shadowX.set(s.x)
    shadowY.set(s.y + 92 * s.scale)
    shadowScale.set(s.scale)
  }, active)

  useEffect(() => {
    if (!active) return undefined
    let offTimeout
    const interval = setInterval(() => {
      setScanPos({ x: x.get(), y: y.get() + 96 * scale.get() })
      setScanning(true)
      offTimeout = setTimeout(() => setScanning(false), 1400)
    }, 4800)
    return () => {
      clearInterval(interval)
      clearTimeout(offTimeout)
    }
  }, [active, x, y, scale])

  return (
    <g className={className}>
      <motion.ellipse
        cx={shadowX}
        cy={shadowY}
        rx={26}
        ry={7}
        fill="#000000"
        style={{ opacity: 0.28, scale: shadowScale }}
      />

      {scanning && (
        <>
          <motion.polygon
            points="0,-2 -16,0 16,0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.16, 0] }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            fill="#a4d9b6"
            transform={`translate(${scanPos.x} ${scanPos.y - 96}) scale(6, 1)`}
            style={{ transformBox: 'fill-box' }}
          />
          <g transform={`translate(${scanPos.x} ${scanPos.y})`}>
            <ScanPulse size={70} color="#e8b955" rings={2} duration={1.3} className="-translate-x-1/2 -translate-y-1/2" />
          </g>
        </>
      )}

      <motion.g style={{ x, y, rotate: bank, scale }}>
        <g transform="scale(1.5)">
          <ellipse cx={0} cy={2} rx={9} ry={9} fill="#0c0f0e" opacity={0.5} className="blur-[1px]" />
        {[
          [-24, -14],
          [24, -14],
          [-24, 14],
          [24, 14],
        ].map(([rx, ry], i) => (
          <g key={i}>
            <line x1={0} y1={0} x2={rx} y2={ry} stroke="#232b27" strokeWidth={2.4} />
            <circle cx={rx} cy={ry} r={10} fill="#cdd6cf" opacity={0.22} className="animate-pulse-slow" />
            <circle cx={rx} cy={ry} r={2.4} fill="#07090a" />
          </g>
        ))}

        <rect x={-15} y={-7} width={30} height={14} rx={5} fill="#1a201d" stroke="#5fb87e" strokeWidth={0.8} strokeOpacity={0.5} />
        <rect x={-4} y={-11} width={8} height={5} rx={1.5} fill="#121614" />
        <line x1={0} y1={-11} x2={0} y2={-17} stroke="#8fa093" strokeWidth={1} />
        <circle cx={0} cy={-18} r={1.6} fill="#e8b955" className="animate-pulse-slow" />

        <circle cx={0} cy={10} r={4.6} fill="#07090a" stroke="#d6a13c" strokeWidth={0.9} />
        <circle cx={-1} cy={9} r={1.3} fill="#f3cd7c" opacity={0.7} />

        <circle cx={-25} cy={-15} r={1.4} fill="#e05c5c" />
        <circle cx={25} cy={-15} r={1.4} fill="#5fb87e" />
        </g>
      </motion.g>
    </g>
  )
}
