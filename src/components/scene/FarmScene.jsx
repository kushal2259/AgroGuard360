import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  VIEWBOX_W,
  VIEWBOX_H,
  VP,
  FIELD_TOP_Y,
  FIELD_BOTTOM_Y,
  FIELD_LEFT_BOTTOM,
  FIELD_RIGHT_BOTTOM,
  projectHero,
  depthEase,
  TOPDOWN_FIELD,
} from './fieldGeometry.js'

const STRIPE_COUNT = 22
const STRIPE_PALETTE = ['#164a30', '#1e5c3b', '#2a7549', '#1a5334', '#235f3d']

function hashPick(i) {
  return STRIPE_PALETTE[(i * 3 + 1) % STRIPE_PALETTE.length]
}

function CropStripes() {
  const stripes = useMemo(() => {
    const items = []
    for (let i = 0; i < STRIPE_COUNT; i += 1) {
      const bx0 = FIELD_LEFT_BOTTOM + ((FIELD_RIGHT_BOTTOM - FIELD_LEFT_BOTTOM) * i) / STRIPE_COUNT
      const bx1 = FIELD_LEFT_BOTTOM + ((FIELD_RIGHT_BOTTOM - FIELD_LEFT_BOTTOM) * (i + 1)) / STRIPE_COUNT
      const topL = projectHero(bx0, depthEase(0.985))
      const topR = projectHero(bx1, depthEase(0.985))
      const bottomL = { x: bx0, y: FIELD_BOTTOM_Y }
      const bottomR = { x: bx1, y: FIELD_BOTTOM_Y }
      const points = `${bottomL.x},${bottomL.y} ${bottomR.x},${bottomR.y} ${topR.x},${topR.y} ${topL.x},${topL.y}`
      items.push({ key: i, points, fill: hashPick(i), delay: (i % 5) * 0.4 })
    }
    return items
  }, [])

  return (
    <g>
      {stripes.map((s) => (
        <polygon
          key={s.key}
          points={s.points}
          fill={s.fill}
          className="animate-crop-sway"
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}
    </g>
  )
}

function FurrowLines() {
  const lines = useMemo(() => {
    const rows = []
    const rowCount = 14
    for (let i = 1; i < rowCount; i += 1) {
      const t = depthEase(i / rowCount)
      const y = projectHero(0, t).y
      const left = projectHero(FIELD_LEFT_BOTTOM, t).x
      const right = projectHero(FIELD_RIGHT_BOTTOM, t).x
      rows.push({ key: i, y, left, right, opacity: 0.05 + 0.05 * (1 - t) })
    }
    return rows
  }, [])

  return (
    <g stroke="#06120c" strokeWidth={1.5}>
      {lines.map((l) => (
        <line key={l.key} x1={l.left} x2={l.right} y1={l.y} y2={l.y} opacity={l.opacity} />
      ))}
    </g>
  )
}

function TreeLine() {
  const path = useMemo(() => {
    const pts = []
    const segs = 40
    for (let i = 0; i <= segs; i += 1) {
      const x = (VIEWBOX_W * i) / segs
      const bump = Math.sin(i * 0.9) * 6 + Math.sin(i * 2.3) * 3
      pts.push(`${x},${FIELD_TOP_Y - 6 - Math.abs(bump)}`)
    }
    return `M0,${FIELD_TOP_Y + 20} L${pts.join(' L')} L${VIEWBOX_W},${FIELD_TOP_Y + 20} Z`
  }, [])
  return <path d={path} fill="#0b2118" opacity={0.85} />
}

function FarmBuilding({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-22} y={-16} width={44} height={20} fill="#33251a" />
      <polygon points="-26,-16 0,-32 26,-16" fill="#241a12" />
      <rect x={-4} y={-8} width={8} height={12} fill="#0c0f0e" />
      <circle cx={34} cy={-6} r={5} fill="#473424" />
      <rect x={30} y={-6} width={8} height={16} fill="#33251a" />
      <circle cx={-2} cy={-11} r={1.4} fill="#e8b955" className="animate-pulse-slow" />
    </g>
  )
}

function IrrigationPond({ x, y, rx, ry }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="url(#pondGrad)" opacity={0.9} />
      <ellipse cx={x} cy={y} rx={rx * 0.6} ry={ry * 0.4} fill="none" stroke="#a4d9b6" strokeWidth={0.6} opacity={0.35} className="animate-pulse-slow" />
    </g>
  )
}

function DirtRoad() {
  const p1 = projectHero(120, 0)
  const p2 = projectHero(260, 0)
  const t1 = projectHero(760, 0.94)
  const t2 = projectHero(800, 0.94)
  const d = `M${p1.x},${p1.y} L${t1.x},${t1.y} L${t2.x},${t2.y} L${p2.x},${p2.y} Z`
  return <path d={d} fill="#33251a" opacity={0.55} />
}

function Particles({ count = 12 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: i,
        x: 200 + ((i * 137) % 1200),
        y: 420 + ((i * 89) % 420),
        r: 1 + (i % 3),
        dur: 5 + (i % 4),
        delay: (i % 6) * 0.6,
      })),
    [count],
  )
  return (
    <g>
      {dots.map((d) => (
        <motion.circle
          key={d.key}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#f4f6f3"
          initial={{ opacity: 0, y: d.y }}
          animate={{ opacity: [0, 0.35, 0], y: d.y - 60 }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </g>
  )
}

function SceneDefs() {
  return (
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#07090a" />
        <stop offset="55%" stopColor="#0c1a13" />
        <stop offset="85%" stopColor="#1a2e1f" />
        <stop offset="100%" stopColor="#3a3320" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f3cd7c" stopOpacity="0.85" />
        <stop offset="45%" stopColor="#d6a13c" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#d6a13c" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hazeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a201d" stopOpacity="0.75" />
        <stop offset="35%" stopColor="#1a201d" stopOpacity="0" />
        <stop offset="100%" stopColor="#1a201d" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="pondGrad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#5fb87e" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#0b2118" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#071410" />
      </radialGradient>
      <pattern id="topdownStripes" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#1e5c3b" />
        <rect width="80" height="36" fill="#164a30" />
      </pattern>
      <linearGradient id="topdownVignette" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#07090a" stopOpacity="0.55" />
        <stop offset="15%" stopColor="#07090a" stopOpacity="0" />
        <stop offset="85%" stopColor="#07090a" stopOpacity="0" />
        <stop offset="100%" stopColor="#07090a" stopOpacity="0.55" />
      </linearGradient>
    </defs>
  )
}

function HeroScene({ children }) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <SceneDefs />
      <image href="/farm_bg.jpg" x="0" y="0" width={VIEWBOX_W} height={VIEWBOX_H} preserveAspectRatio="xMidYMid slice" />
      {children}
    </svg>
  )
}

function projectHeroCircle() {
  const p = projectHero(1180, depthEase(0.62))
  return { x: p.x, y: p.y, rx: 90 * p.scale, ry: 34 * p.scale }
}

function TopdownScene({ children }) {
  const f = TOPDOWN_FIELD
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <SceneDefs />
      <rect x={0} y={0} width={VIEWBOX_W} height={VIEWBOX_H} fill="#0a0f0c" />
      <rect x={f.x} y={f.y} width={f.width} height={f.height} fill="url(#topdownStripes)" rx={4} />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1={f.x + (f.width / 12) * i}
          x2={f.x + (f.width / 12) * i}
          y1={f.y}
          y2={f.y + f.height}
          stroke="#06120c"
          strokeWidth={2}
          opacity={0.35}
        />
      ))}
      <FarmBuilding x={f.x + 46} y={f.y + 30} scale={0.7} />
      <IrrigationPond x={f.x + f.width - 90} y={f.y + f.height - 60} rx={70} ry={40} />
      <rect x={f.x} y={f.y} width={f.width} height={f.height} fill="none" stroke="#5fb87e" strokeOpacity={0.25} strokeWidth={2} rx={4} />
      <rect x={0} y={0} width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#topdownVignette)" />
      {children}
    </svg>
  )
}

export default function FarmScene({ variant = 'hero', className = '', children }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {variant === 'topdown' ? <TopdownScene>{children}</TopdownScene> : <HeroScene>{children}</HeroScene>}
    </div>
  )
}

export { TOPDOWN_FIELD }
