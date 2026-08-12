import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene, { TOPDOWN_FIELD } from '../components/scene/FarmScene.jsx'
import ScanPulse from '../components/scene/ScanPulse.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { useLoopFrame } from '../hooks/useLoopFrame.js'
import { useMotionValue } from 'framer-motion'
import { Plane } from 'lucide-react'

const f = TOPDOWN_FIELD
const ROWS = 5
const WAYPOINTS = Array.from({ length: ROWS }, (_, i) => {
  const y = f.y + (f.height / (ROWS - 1)) * i
  const [xa, xb] = i % 2 === 0 ? [f.x + 30, f.x + f.width - 30] : [f.x + f.width - 30, f.x + 30]
  return [
    { x: xa, y },
    { x: xb, y },
  ]
}).flat()

const LEG_S = 1.9
const ANOMALIES = [
  { x: f.x + f.width * 0.32, y: f.y + f.height * 0.28 },
  { x: f.x + f.width * 0.7, y: f.y + f.height * 0.52 },
  { x: f.x + f.width * 0.45, y: f.y + f.height * 0.78 },
]

export default function Pegasus() {
  const x = useMotionValue(WAYPOINTS[0].x)
  const y = useMotionValue(WAYPOINTS[0].y)
  const [areaScanned, setAreaScanned] = useState(0)
  const state = useRef({ index: 1, timer: 0 })

  useLoopFrame((dt) => {
    const s = state.current
    s.timer += dt
    const from = WAYPOINTS[(s.index - 1 + WAYPOINTS.length) % WAYPOINTS.length]
    const to = WAYPOINTS[s.index % WAYPOINTS.length]
    const tt = Math.min(1, s.timer / LEG_S)
    x.set(from.x + (to.x - from.x) * tt)
    y.set(from.y + (to.y - from.y) * tt)
    if (tt >= 1) {
      s.timer = 0
      s.index += 1
      setAreaScanned((a) => Math.min(7.4, a + 1.05))
    }
  })

  return (
    <SlideShell
      kicker="Phase 01 · Aerial Intelligence"
      title="🚁 PEGASUS"
      subtitle="Virtual Drone Survey — the field is scanned lane by lane, no ground crew required."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15">
          <FarmScene variant="topdown" className="h-full w-full">
            <polyline
              points={WAYPOINTS.map((w) => `${w.x},${w.y}`).join(' ')}
              fill="none"
              stroke="#e8b955"
              strokeOpacity={0.35}
              strokeWidth={2}
              strokeDasharray="6 6"
            />
            {ANOMALIES.map((a, i) => (
              <g key={i} transform={`translate(${a.x} ${a.y})`}>
                <circle r={5} fill="#e05c5c" />
                <ScanPulse size={44} color="#e05c5c" rings={1} duration={1.8} className="-translate-x-1/2 -translate-y-1/2" />
              </g>
            ))}
            <motion.g style={{ x, y }}>
              <circle r={12} fill="#0c0f0e" opacity={0.35} />
              <g transform="translate(-9 -9)">
                <foreignObject width={18} height={18}>
                  <div className="flex h-full w-full items-center justify-center text-gold-300">
                    <Plane size={16} />
                  </div>
                </foreignObject>
              </g>
              <ScanPulse size={60} color="#f3cd7c" rings={1} duration={2.2} className="-translate-x-1/2 -translate-y-1/2" />
            </motion.g>
          </FarmScene>
          <div className="pointer-events-none absolute left-4 top-4">
            <StatusBadge variant="active" pulse>
              Scanning Field
            </StatusBadge>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Altitude" value="42" unit="m" />
            <MetricCard label="Speed" value="8.4" unit="m/s" />
            <MetricCard label="Area Scanned" value={areaScanned.toFixed(1)} unit="acres" accent="gold" />
            <MetricCard label="Anomalies" value={ANOMALIES.length} accent="danger" />
          </div>
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4 font-mono text-xs text-mist-400 flex-grow flex flex-col justify-center">
            <div className="mb-2 uppercase tracking-[0.2em] text-mist-500">Function</div>
            <p className="leading-relaxed text-mist-200 mb-4">
              Pegasus is the eyes in the sky of AGROGUARD 360. It flies over the farm and captures crop images that are sent to the AI system for analysis.
            </p>
            <div className="mb-2 uppercase tracking-[0.2em] text-mist-500">Monitors</div>
            <ul className="space-y-1 text-mist-300 mb-4">
               <li>• Crop health</li>
               <li>• Disease</li>
               <li>• Dry/water-stressed areas</li>
               <li>• Pest damage</li>
            </ul>
            <div className="mb-2 uppercase tracking-[0.2em] text-mist-500">Workflow</div>
            <p className="text-gold-300">
              Fly → Scan → Capture → Locate Problem → Send to AI
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
