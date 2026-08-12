import { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useLoopFrame } from '../../hooks/useLoopFrame.js'
import { projectHero, lerp } from './fieldGeometry.js'

const DEFAULT_WAYPOINTS = [
  { bx: 140, d: 0.04 },
  { bx: 140, d: 0.32 },
  { bx: 500, d: 0.32 },
  { bx: 500, d: 0.04 },
  { bx: 840, d: 0.04 },
  { bx: 840, d: 0.32 },
]

const DRIVE_S = 2.6
const PAUSE_S = 0.5
const INSPECT_S = 1.7
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export default function GroundRobot({ active = true, waypoints = DEFAULT_WAYPOINTS, onStateChange, className = '' }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(0.7)
  const heading = useMotionValue(0)
  const bob = useMotionValue(0)
  const headAngle = useMotionValue(0)
  const shadowX = useMotionValue(0)
  const shadowY = useMotionValue(0)
  const shadowScale = useMotionValue(0.6)
  const [phase, setPhase] = useState('drive')

  const state = useRef({
    wpIndex: 1,
    phase: 'drive',
    timer: 0,
    start: { ...waypoints[0] },
    target: { ...waypoints[1] },
  })

  useLoopFrame((dt) => {
    const s = state.current
    s.timer += dt

    if (s.phase === 'drive') {
      const tt = Math.min(1, s.timer / DRIVE_S)
      const eased = easeInOut(tt)
      let bx = lerp(s.start.bx, s.target.bx, eased)
      const d = lerp(s.start.d, s.target.d, eased)
      if (s.wpIndex % 3 === 2) {
        bx += Math.sin(eased * Math.PI) * 34
      }
      const p = projectHero(bx, d)
      x.set(p.x)
      y.set(p.y)
      scale.set(p.scale)
      bob.set(Math.sin(s.timer * 10) * 1.6 * p.scale)

      const dx = s.target.bx - s.start.bx
      const dd = s.target.d - s.start.d
      if (Math.abs(dx) > 1 || Math.abs(dd) > 0.001) {
        const proj = projectHero(s.target.bx, s.target.d)
        const startProj = projectHero(s.start.bx, s.start.d)
        heading.set((Math.atan2(proj.y - startProj.y, proj.x - startProj.x) * 180) / Math.PI + 90)
      }

      shadowX.set(p.x)
      shadowY.set(p.y + 20 * p.scale)
      shadowScale.set(p.scale)

      if (tt >= 1) {
        s.phase = 'pause'
        s.timer = 0
        setPhase('pause')
        onStateChange?.({ phase: 'pause', wpIndex: s.wpIndex })
      }
    } else if (s.phase === 'pause') {
      if (s.timer >= PAUSE_S) {
        s.phase = 'inspect'
        s.timer = 0
        setPhase('inspect')
        onStateChange?.({ phase: 'inspect', wpIndex: s.wpIndex })
      }
    } else if (s.phase === 'inspect') {
      headAngle.set(Math.sin(s.timer * 5) * 32)
      if (s.timer >= INSPECT_S) {
        headAngle.set(0)
        s.start = { ...s.target }
        s.wpIndex = (s.wpIndex + 1) % waypoints.length
        s.target = waypoints[s.wpIndex]
        s.phase = 'drive'
        s.timer = 0
        setPhase('drive')
        onStateChange?.({ phase: 'drive', wpIndex: s.wpIndex })
      }
    }
  }, active)

  return (
    <g className={className}>
      <motion.ellipse cx={shadowX} cy={shadowY} rx={16} ry={5} fill="#000000" style={{ opacity: 0.32, scale: shadowScale }} />

      <motion.g style={{ x, y, scale }}>
        <motion.g style={{ y: bob, rotate: heading, scale: 3.5 }}>
          {/* Legs */}
          <line x1={-4} y1={0} x2={-4} y2={12} stroke="#cccccc" strokeWidth={3} strokeLinecap="round" />
          <line x1={4} y1={0} x2={4} y2={12} stroke="#cccccc" strokeWidth={3} strokeLinecap="round" />
          {/* Body */}
          <rect x={-8} y={-16} width={16} height={18} rx={3} fill="#eeeeee" stroke="#888888" strokeWidth={1} />
          {/* Core glow */}
          <circle cx={0} cy={-7} r={3} fill="#d6a13c" className="animate-pulse" />
          {/* Arms */}
          <line x1={-9} y1={-12} x2={-14} y2={-2} stroke="#aaaaaa" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={9} y1={-12} x2={14} y2={-2} stroke="#aaaaaa" strokeWidth={2.5} strokeLinecap="round" />
          {/* Head */}
          <motion.g style={{ rotate: headAngle }} transformTemplate={(_p, t) => `translate(0 -22) ${t}`}>
            <rect x={-6} y={-6} width={12} height={12} rx={3} fill="#f4f6f3" stroke="#8fa093" strokeWidth={1} />
            {/* Eyes */}
            <circle cx={-3} cy={-1} r={1.5} fill="#5fb87e" className={phase === 'inspect' ? 'animate-pulse-slow' : ''} />
            <circle cx={3} cy={-1} r={1.5} fill="#5fb87e" className={phase === 'inspect' ? 'animate-pulse-slow' : ''} />
          </motion.g>
        </motion.g>
      </motion.g>
    </g>
  )
}
