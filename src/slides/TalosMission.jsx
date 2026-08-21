import SlideShell from '../components/SlideShell.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import FarmScene, { TOPDOWN_FIELD } from '../components/scene/FarmScene.jsx'
import ScanPulse from '../components/scene/ScanPulse.jsx'
import { motion } from 'framer-motion'
import { Bot, MapPin } from 'lucide-react'

const f = TOPDOWN_FIELD
const WAYPOINTS = [
  { x: f.x + 40, y: f.y + f.height - 40 },
  { x: f.x + f.width * 0.4, y: f.y + f.height * 0.5 },
  { x: f.x + f.width * 0.7, y: f.y + f.height * 0.3 }
]

export default function TalosMission() {
  return (
    <SlideShell
      kicker="Phase 06 · Robotic Execution"
      title="🤖 TALOS MISSION LOOP"
      subtitle="TALOS physically travels through crop rows to perform targeted ground operations."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        
        {/* Left Column: Grid Simulation */}
        <div className="relative overflow-hidden rounded-md border border-mist-500/15">
          <FarmScene variant="topdown" className="h-full w-full">
            <polyline
              points={WAYPOINTS.map((w) => `${w.x},${w.y}`).join(' ')}
              fill="none"
              stroke="#5fb87e"
              strokeOpacity={0.5}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            {WAYPOINTS.map((w, i) => (
              <g key={i} transform={`translate(${w.x} ${w.y})`}>
                <circle r={4} fill="#e8b955" />
              </g>
            ))}
            <motion.g 
              animate={{ 
                x: WAYPOINTS.map(w => w.x), 
                y: WAYPOINTS.map(w => w.y) 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
            >
              <circle r={10} fill="#0c0f0e" opacity={0.4} />
              <g transform="translate(-7 -7)">
                <Bot size={14} className="text-field-300" />
              </g>
              <ScanPulse size={36} color="#5fb87e" rings={1} duration={1.6} className="-translate-x-1/2 -translate-y-1/2" />
            </motion.g>
          </FarmScene>
          <div className="pointer-events-none absolute left-4 top-4">
            <StatusBadge variant="active" pulse>
              In Transit · Row Crop Lane 3
            </StatusBadge>
          </div>
        </div>

        {/* Right Column: Mission loops */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none pr-1">
          <div className="grid grid-cols-2 gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Speed" value="0.8" unit="m/s" />
            <MetricCard label="Position" value="X: 3.2, Y: 1.8" accent="gold" />
          </div>

          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">🔄 Ground Intervention stages</h4>
              <p className="text-mist-300 leading-relaxed font-light mb-2">
                Instead of simply teleporting, TALOS travels row-by-row to prevent soil compaction and crop foliage damage.
              </p>
            </div>

            <div className="font-mono text-[10px] text-white bg-charcoal-950/50 p-3 rounded border border-white/5 space-y-2">
              <div className="flex gap-2">
                <span className="text-sky-300">STAGE 1:</span>
                <span>Receive localized coordinate packet via Bluetooth serial link (HC-05).</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sky-300">STAGE 2:</span>
                <span>Navigate optimal grid lines (A* calculated path).</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sky-300">STAGE 3:</span>
                <span>Deploy targeted sensor probes (capacitive soil measurement).</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sky-300">STAGE 4:</span>
                <span>Perform localized intervention (open water solenoid valve).</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sky-300">STAGE 5:</span>
                <span>Return to solar dock station / check queue.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
