import { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene, { TOPDOWN_FIELD } from '../components/scene/FarmScene.jsx'
import ScanPulse from '../components/scene/ScanPulse.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { useLoopFrame } from '../hooks/useLoopFrame.js'
import { Bot } from 'lucide-react'

const f = TOPDOWN_FIELD
const ROUTE = [
  { label: 'BASE', x: f.x + 50, y: f.y + f.height - 50 },
  { label: 'CROP ZONE', x: f.x + f.width * 0.38, y: f.y + f.height * 0.58 },
  { label: 'INSPECTION', x: f.x + f.width * 0.55, y: f.y + f.height * 0.32 },
  { label: 'SENSOR POINT', x: f.x + f.width * 0.74, y: f.y + f.height * 0.5 },
  { label: 'BASE', x: f.x + 50, y: f.y + f.height - 50 },
]
const LEG_S = 2.4
const STOP_S = 0.9

export default function Talos() {
  const x = useMotionValue(ROUTE[0].x)
  const y = useMotionValue(ROUTE[0].y)
  const [legIndex, setLegIndex] = useState(0)
  const [status, setStatus] = useState('MOVING')
  const [distance, setDistance] = useState(0)
  const [obstacles, setObstacles] = useState(0)
  const [battery, setBattery] = useState(78)
  const state = useRef({ index: 1, timer: 0, phase: 'drive' })

  useLoopFrame((dt) => {
    const s = state.current
    s.timer += dt
    setBattery((b) => Math.max(54, b - dt * 0.35))

    if (s.phase === 'drive') {
      const from = ROUTE[(s.index - 1) % ROUTE.length]
      const to = ROUTE[s.index % ROUTE.length]
      const tt = Math.min(1, s.timer / LEG_S)
      let bx = from.x + (to.x - from.x) * tt
      const by = from.y + (to.y - from.y) * tt
      if (s.index === 2) bx += Math.sin(tt * Math.PI) * 30
      x.set(bx)
      y.set(by)
      if (tt >= 1) {
        s.phase = 'stop'
        s.timer = 0
        setStatus(to.label === 'BASE' ? 'DOCKING' : 'INSPECTING')
        setLegIndex(s.index % ROUTE.length)
        setDistance((d) => d + 46)
        if (s.index === 2) setObstacles((o) => o + 1)
      }
    } else if (s.phase === 'stop') {
      if (s.timer >= STOP_S) {
        s.phase = 'drive'
        s.timer = 0
        s.index += 1
        setStatus('MOVING')
        if (s.index % ROUTE.length === 1) setBattery(78)
      }
    }
  })

  return (
    <SlideShell
      kicker="Phase 03 · Autonomous Robotics"
      title="🤖 TALOS"
      subtitle="AGROBOT 360 — ground truth, gathered without a single footstep from the farmer."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15">
          <FarmScene variant="topdown" className="h-full w-full">
            <polyline
              points={ROUTE.map((w) => `${w.x},${w.y}`).join(' ')}
              fill="none"
              stroke="#5fb87e"
              strokeOpacity={0.4}
              strokeWidth={2}
              strokeDasharray="8 5"
            />
            {ROUTE.slice(0, 4).map((w, i) => (
              <g key={i} transform={`translate(${w.x} ${w.y})`}>
                <circle r={4} fill={i <= legIndex ? '#e8b955' : '#8fa093'} />
              </g>
            ))}
            <motion.g style={{ x, y }}>
              <circle r={11} fill="#0c0f0e" opacity={0.4} />
              <g transform="translate(-8 -8)">
                <foreignObject width={16} height={16}>
                  <div className="flex h-full w-full items-center justify-center text-field-200">
                    <Bot size={15} />
                  </div>
                </foreignObject>
              </g>
              {status === 'INSPECTING' && (
                <ScanPulse size={54} color="#e8b955" rings={1} duration={1.4} className="-translate-x-1/2 -translate-y-1/2" />
              )}
            </motion.g>
          </FarmScene>
          <div className="pointer-events-none absolute left-4 top-4">
            <StatusBadge variant="active" pulse>
              {status}
            </StatusBadge>
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mist-500">
            BASE → CROP ZONE → INSPECTION → SENSOR POINT → RETURN
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Battery" value={battery.toFixed(0)} unit="%" accent={battery < 60 ? 'danger' : 'field'} />
            <MetricCard label="Mission" value="Active" accent="gold" />
            <MetricCard label="Distance" value={distance} unit="m" />
            <MetricCard label="Obstacles Avoided" value={obstacles} />
          </div>
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4 flex-grow flex flex-col justify-center">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Function</div>
            <p className="text-sm text-mist-200 mb-4 leading-relaxed">
               After a problem is detected, Talos travels to the affected location to inspect the crop and collect ground-level information.
            </p>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Capabilities</div>
            <ul className="space-y-1.5 text-xs text-mist-300">
               <li>• Navigate between crop rows</li>
               <li>• Detect obstacles</li>
               <li>• Inspect unhealthy plants</li>
               <li>• Measure soil conditions</li>
               <li>• Carry a small water/spray mechanism</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
