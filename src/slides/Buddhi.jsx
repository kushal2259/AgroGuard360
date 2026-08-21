import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import Panel from '../components/hud/Panel.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'

const BOXES = [
  { x: 18, y: 22, w: 26, h: 22, label: 'Leaf discoloration', conf: '94.7%', delay: 0.6 },
  { x: 55, y: 46, w: 22, h: 18, label: 'Spot pattern', conf: '87.2%', delay: 1.0 },
  { x: 34, y: 62, w: 18, h: 16, label: 'Leaf curl', conf: '73.5%', delay: 1.4 },
]

export default function Buddhi() {
  return (
    <SlideShell
      kicker="Phase 02 · AI Intelligence"
      title="🧠 BUDDHI"
      subtitle="AI Crop Analysis Engine — computer vision reads what the eye would miss."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-[radial-gradient(circle_at_30%_20%,#2a7549_0%,#164a30_45%,#0b2118_100%)]">
          <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(120deg,rgba(7,20,16,0.5)_0px,rgba(7,20,16,0.5)_2px,transparent_2px,transparent_22px)]" />
          <div className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-field-200/10 to-transparent">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-transparent via-mist-100/25 to-transparent"
              animate={{ y: ['-10%', '620%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="absolute left-3 top-3">
            <StatusBadge variant="active" pulse>
              Live Vision Feed · Simulation
            </StatusBadge>
          </div>

          {BOXES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: b.delay, duration: 0.4 }}
              className="absolute rounded-sm border-2 border-gold-400/80"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
            >
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-charcoal-950/85 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold-300">
                {b.label} · {b.conf}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none h-full pb-8 pr-2">
          
          {/* Phase 4 — BUDDHI — Farm Intelligence Engine */}
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5">
            <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">🧠 BUDDHI — AI Intelligence Engine</h4>
            
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Purpose</span>
              <p className="text-sm text-mist-200">The central brain of AGROGUARD 360, merging telemetry to direct automatic corrective actions.</p>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Multi-Source Inputs</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-mist-300 font-mono bg-charcoal-950/30 p-3 rounded border border-white/5">
                <div>• PEGASUS Aerial Frames</div>
                <div>• IoT Sensors Telemetry</div>
                <div>• PROMETHIA Health Index</div>
                <div>• TALOS Soil Readings</div>
                <div>• Historical Farm Database</div>
                <div>• Local Weather APIs</div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Processing Workflow</span>
              <div className="font-mono text-[10px] text-white bg-charcoal-950/50 p-2.5 rounded border border-white/5 flex flex-wrap gap-1.5 justify-center">
                <span className="text-mist-500">DATA</span> ➔ 
                <span className="text-gold-400">ANALYSIS</span> ➔ 
                <span className="text-orange-400">RISK DETECTION</span> ➔ 
                <span className="text-red-400">DECISION</span> ➔ 
                <span className="text-field-400">RECOMMENDATION</span> ➔ 
                <span className="text-sky-400">ACTION</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Closed-Loop Decision Example</span>
              <div className="font-mono text-[11px] text-gold-300 bg-charcoal-950/50 p-3 rounded border border-white/5 space-y-1">
                <div>1. Input: <span className="text-mist-300">Soil Moisture = Low (Zone B)</span></div>
                <div>2. Diagnosis: <span className="text-red-400">"Water stress detected in Zone B."</span></div>
                <div>3. Recommendation: <span className="text-sky-300">"Activate irrigation for Zone B."</span></div>
                <div className="border-t border-white/10 pt-1 mt-1 text-field-300">4. Action: Valve ➔ ON | Pump ➔ ON</div>
              </div>
            </div>
          </div>

          {/* AI DECISIONS DASHBOARD */}
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5">
            <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mb-3 border-b border-white/10 pb-2">📋 AI Decision Queue</h4>
            
            <ul className="space-y-2.5">
              <li className="flex justify-between items-center bg-white/5 p-2.5 rounded text-xs border border-white/5">
                <span className="text-mist-200">💧 Target Irrigation</span>
                <span className="font-mono text-sky-400">[Irrigate Zone B]</span>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-2.5 rounded text-xs border border-white/5">
                <span className="text-mist-200">🤖 Dispatch Ground Rover</span>
                <span className="font-mono text-field-400">[Inspect Zone C]</span>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-2.5 rounded text-xs border border-white/5">
                <span className="text-mist-200">🚁 Dispatch Telemetry Drone</span>
                <span className="font-mono text-sky-300">[Send PEGASUS to D]</span>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-2.5 rounded text-xs border border-white/5">
                <span className="text-mist-200">🛡️ Targeted Weed Control</span>
                <span className="font-mono text-red-400">[Send TALOS to Zone C]</span>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-2.5 rounded text-xs border border-white/5">
                <span className="text-mist-200">🌾 Harvest Scheduling</span>
                <span className="font-mono text-gold-400">[Prepare E for Harvest]</span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </SlideShell>
  )
}
