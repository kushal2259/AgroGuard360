import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import Panel from '../components/hud/Panel.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'

const FARM_ZONES = [
  { id: 'Zone A', status: 'HEALTHY', health: 96, risk: 'None', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
  { id: 'Zone B', status: 'MONITOR', health: 82, risk: 'Water warning', color: 'border-yellow-500 bg-yellow-500/10 text-yellow-400' },
  { id: 'Zone C', status: 'CRITICAL', health: 38, risk: 'Disease (Late Blight)', color: 'border-red-500 bg-red-500/15 text-red-400' },
  { id: 'Zone D', status: 'STRESSED', health: 58, risk: 'Water stress', color: 'border-orange-500 bg-orange-500/10 text-orange-400' },
  { id: 'Zone E', status: 'AT RISK', health: 62, risk: 'Pest Risk', color: 'border-yellow-600 bg-yellow-600/10 text-yellow-500' },
]

export default function Promethia() {
  const [selectedZone, setSelectedZone] = useState(FARM_ZONES[2])

  return (
    <SlideShell
      kicker="Phase 05 · Crop Intelligence"
      title="🌿 PROMETHIA"
      subtitle="Plant Health & Disease Diagnostics — Continuous crop health scanning."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        
        {/* Left column: Visual Field Overlays */}
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none" />
          
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-2">Live Field Overlay Matrix</h3>
            <p className="text-xs text-mist-400 font-light mb-4">Click a sector to query PROMETHIA health metrics.</p>
          </div>

          <div className="grid grid-cols-5 gap-3 my-4">
            {FARM_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`flex flex-col justify-between p-3 rounded-2xl border aspect-[3/4] transition-all text-left ${
                  selectedZone.id === zone.id
                    ? `${zone.color} ring-2 ring-white/20 scale-[1.03] shadow-lg`
                    : 'border-white/5 bg-white/5 text-mist-400 hover:bg-white/10'
                }`}
              >
                <span className="font-mono text-xs font-bold">{zone.id}</span>
                <div className="flex flex-col mt-auto">
                  <span className="text-lg font-mono font-bold leading-none">{zone.health}%</span>
                  <span className="text-[9px] uppercase tracking-widest mt-1 opacity-80">{zone.status}</span>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedZone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-charcoal-950/80 border border-white/5 rounded-2xl flex justify-between items-center"
            >
              <div>
                <span className="font-mono text-[9px] text-mist-500 uppercase tracking-widest">Active Diagnosis</span>
                <h4 className="font-display text-sm font-bold text-white mt-1">{selectedZone.id} Analysis Summary</h4>
                <p className="text-xs text-mist-300 mt-1 font-light">Status: {selectedZone.risk}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-mist-500 block uppercase">Priority</span>
                <span className={`font-mono text-sm font-bold ${selectedZone.health < 50 ? 'text-red-400' : 'text-gold-400'}`}>
                  {selectedZone.health < 50 ? 'HIGH' : selectedZone.health < 80 ? 'MEDIUM' : 'LOW'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right column: Specs list */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none h-full pb-8 pr-2">
          
          {/* Phase 5 — PROMETHIA — Crop Intelligence System */}
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5">
            <h4 className="font-mono text-sm uppercase tracking-widest text-emerald-400 mb-3 border-b border-white/10 pb-2">🌿 PROMETHIA — Crop Diagnostics</h4>
            
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Purpose</span>
              <p className="text-sm text-mist-200">Continuous analysis targeting plant stress and growth abnormalities directly on the foliage.</p>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Detection Capabilities</span>
              <ul className="text-sm text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                <li>Volumetric Water Stress.</li>
                <li>Fungal/Bacterial Disease symptoms.</li>
                <li>Insect and Pest risk assessments.</li>
                <li>Nutrient deficiencies & growth anomalies.</li>
              </ul>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Crop Health Scale</span>
              <div className="font-mono text-[9px] text-white bg-charcoal-950/50 p-2.5 rounded border border-white/5 flex flex-wrap gap-1.5 justify-center">
                <span className="text-emerald-400 font-bold">HEALTHY</span> ➔ 
                <span className="text-yellow-400">MONITOR</span> ➔ 
                <span className="text-orange-400">STRESSED</span> ➔ 
                <span className="text-yellow-600">AT RISK</span> ➔ 
                <span className="text-red-500">CRITICAL</span>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Overlay Visualizer Index</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-charcoal-950/30 p-3 rounded border border-white/5">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Green: Healthy</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Yellow: Warning</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Orange: Stressed</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Red: Critical</div>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Closed-Loop Integration Pipeline</span>
              <div className="font-mono text-[11px] text-emerald-300 bg-charcoal-950/50 p-3 rounded border border-white/5 space-y-1 text-center">
                <div>PROMETHIA (Detects Stress)</div>
                <div className="text-mist-500 text-xs">▼</div>
                <div>BUDDHI (Generates Dispatch Plan)</div>
                <div className="text-mist-500 text-xs">▼</div>
                <div>TALOS (Executes Ground Action)</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </SlideShell>
  )
}
