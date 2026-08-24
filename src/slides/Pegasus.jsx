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
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
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

        <div className="flex flex-col gap-4 h-full min-h-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-4 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Altitude" value="15" unit="m" />
            <MetricCard label="Speed" value="6.2" unit="m/s" />
            <MetricCard label="Coverage" value="100" unit="%" accent="gold" />
            <MetricCard label="Scan Mode" value="Multispectral" accent="field" />
          </div>
          
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4 flex-grow overflow-y-auto scrollbar-none relative space-y-4">
            
            {/* PEGASUS — Autonomous Agricultural Drone */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-2.5 border-b border-white/10 pb-1.5">🚁 PEGASUS — Aerial Intelligence</h4>
              
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-widest text-mist-500 block mb-0.5">Purpose</span>
                <p className="text-xs text-mist-200">The primary monitoring & aerial image capture system.</p>
              </div>

              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-widest text-mist-500 block mb-0.5">Hardware Representation</span>
                <ul className="text-xs text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                  <li><strong>Structure:</strong> Carbon frame with four/eight brushless rotors.</li>
                  <li><strong>Optical:</strong> Dual camera array (Visible light + Thermal/Multispectral sensors).</li>
                  <li><strong>Modules:</strong> GPS Positioning + SiK telemetry link.</li>
                  <li><strong>Power:</strong> 4S / 6S LiPo Battery pack + status LED indicators.</li>
                </ul>
              </div>

              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-widest text-mist-500 block mb-0.5">Core Functions</span>
                <ul className="text-xs text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                  <li>Autonomous flight & terrain scanning.</li>
                  <li>Real-time thermal / NDVI crop health mapping.</li>
                  <li>Instant coordinates capture of stress zones.</li>
                </ul>
              </div>

              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-widest text-mist-500 block mb-0.5">Drone Modes Loop</span>
                <div className="font-mono text-[9px] text-white bg-charcoal-950/50 p-2 rounded border border-white/5 flex flex-wrap gap-1 justify-center">
                  <span className="text-mist-400">IDLE</span> ➔ 
                  <span className="text-gold-400">TAKEOFF</span> ➔ 
                  <span className="text-sky-400">FIELD SCAN</span> ➔ 
                  <span className="text-field-400">DATA COLLECTION</span> ➔ 
                  <span className="text-gold-400">RETURN</span> ➔ 
                  <span className="text-mist-400">LAND</span>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </SlideShell>
  )
}
