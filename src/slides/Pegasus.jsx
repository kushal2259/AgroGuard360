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
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 flex-grow overflow-y-auto scrollbar-none relative">
            
            {/* 2. PEGASUS — Drone Module */}
            <div className="mb-6">
              <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">2. Drone Module (Hardware)</h4>
              
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Purpose</span>
                <ul className="text-sm text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                  <li>Aerial monitoring.</li>
                  <li>Covers larger farm areas.</li>
                  <li>Captures crop images.</li>
                  <li>Sends images to the AI-processing system.</li>
                  <li>Provides the initial location/zone information.</li>
                </ul>
              </div>

              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Hardware Specs</span>
                <ul className="text-sm text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                  <li>F450-class drone frame.</li>
                  <li>4 × 2212-class brushless motors & 4 × ESCs.</li>
                  <li>1045 propellers.</li>
                  <li>Pixhawk-class flight controller & NEO-M8N GPS.</li>
                  <li>RGB/Raspberry Pi camera.</li>
                  <li>3S/4S LiPo battery.</li>
                  <li>RC transmitter/receiver (Optional SiK 915 MHz).</li>
                </ul>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Working</span>
                <div className="font-mono text-[11px] text-gold-300 bg-charcoal-950/50 p-2 rounded border border-white/5 inline-block">
                  Drone → Camera → Images → Wireless Transfer → Laptop → BUDDHI
                </div>
                <p className="text-xs text-mist-400 mt-2 italic">
                  * Prototype does not require AI model to run directly on the drone. Pegasus captures; laptop processes.
                </p>
              </div>
            </div>

            {/* 9. COMMUNICATION SYSTEM */}
            <div className="mb-6">
              <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mb-3 border-b border-white/10 pb-2">9. Communication System</h4>
              <p className="text-sm text-mist-200 mb-3">Connects the different modules via Wi-Fi, Bluetooth, or software-based data exchange (API/JSON).</p>
              <div className="font-mono text-[11px] text-field-300 bg-charcoal-950/50 p-3 rounded border border-white/5 space-y-2">
                <div>[PEGASUS] → Camera Image → Wi-Fi → Laptop → [BUDDHI]</div>
              </div>
            </div>

            {/* 10. LOCATION MAPPING */}
            <div>
              <h4 className="font-mono text-sm uppercase tracking-widest text-mist-100 mb-3 border-b border-white/10 pb-2">10. Location Mapping</h4>
              <p className="text-sm text-mist-300 mb-2">Drone image maps to a specific grid coordinate for the robot:</p>
              <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-2 rounded border border-white/5">
                Disease detected → Image region → Zone B2 → Grid B2 → Robot target
              </div>
            </div>

          </div>
        </div>
      </div>
    </SlideShell>
  )
}
