import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import Panel from '../components/hud/Panel.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { FINANCIAL_IMPACT } from '../data/content.js'

export default function Mercatus() {
  const { withoutSystem, withSystem, currency } = FINANCIAL_IMPACT
  const savings = withoutSystem - withSystem
  const maxVal = withoutSystem

  return (
    <SlideShell
      kicker="Phase 08 · Commerce & Logistics"
      title="📦 MERCATUS"
      subtitle="Agricultural Marketplace & Logistics — Connecting farms directly to buyers."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Stock Level" value="850" unit="KG" accent="gold" />
            <MetricCard label="Market Quality" value="A Grade" accent="field" />
            <MetricCard label="Active Orders" value="3" accent="gold" />
            <MetricCard label="Logistics Status" value="In Route" accent="field" />
          </div>

          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 flex-grow overflow-y-auto scrollbar-none relative space-y-5">
            {/* Phase 8 — MERCATUS */}
            <div>
              <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">📦 MERCATUS — Market & Logistics</h4>
              
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Purpose</span>
                <p className="text-sm text-mist-200">
                  Seamlessly connects core agricultural harvest production to post-production marketplace and transport activities.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Harvest Modules</span>
                  <ul className="text-xs text-mist-300 space-y-1 list-disc ml-4 font-light">
                    <li>Automated harvest-ready crop recognition</li>
                    <li>Estimated yield calculations</li>
                    <li>Crop type sorting</li>
                  </ul>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Inventory Management</span>
                  <ul className="text-xs text-mist-300 space-y-1 list-disc ml-4 font-light">
                    <li>Real-time stored produce volume metrics</li>
                    <li>Automatic quality grading reports</li>
                    <li>Storage room humidity status logs</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Marketplace Listings</span>
                <p className="text-xs text-mist-300 font-light mb-2">
                  Produce listings are auto-created when crops move to storage, offering transparent grading details directly to buyers.
                </p>
                <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-3 rounded border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-gold-300 block font-bold">🌾 WHEAT</span>
                    <span className="text-mist-400">Yield: 850 KG</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 block font-bold">GRADE A</span>
                    <span className="text-field-300 font-semibold">$2.15 / KG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Panel className="flex flex-col justify-center gap-6 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              Supply Chain Pipeline
            </div>
            <StatusBadge variant="active" pulse>Logistics Active</StatusBadge>
          </div>

          {/* Farm -> Storage -> Vehicle -> Market Pipeline */}
          <div className="space-y-4">
            
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/25 border border-emerald-400 flex items-center justify-center font-mono text-[10px] text-emerald-300 shrink-0 mt-0.5">✓</div>
              <div>
                <span className="text-xs font-mono text-mist-400 uppercase tracking-wider block">Stage 1: Farm Harvest</span>
                <p className="text-xs text-white font-medium">850 KG Grade-A Wheat harvested from Zone E</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/25 border border-emerald-400 flex items-center justify-center font-mono text-[10px] text-emerald-300 shrink-0 mt-0.5">✓</div>
              <div>
                <span className="text-xs font-mono text-mist-400 uppercase tracking-wider block">Stage 2: Storage Unit</span>
                <p className="text-xs text-white font-medium">Logged into Storage Silo 2 (Temp: 21°C | Humidity: 45%)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center font-mono text-[10px] text-sky-300 shrink-0 mt-0.5 animate-pulse">➔</div>
              <div>
                <span className="text-xs font-mono text-sky-300 uppercase tracking-wider block animate-pulse">Stage 3: Transport Vehicle</span>
                <p className="text-xs text-white font-medium">Loaded onto truck GJ-01-XX-XXXX. En route to market.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-charcoal-800 border border-white/10 flex items-center justify-center font-mono text-[10px] text-mist-500 shrink-0 mt-0.5">➔</div>
              <div>
                <span className="text-xs font-mono text-mist-500 uppercase tracking-wider block">Stage 4: Marketplace Destination</span>
                <p className="text-xs text-mist-400 font-light">Ahmedabad wholesale grain exchange · Buyer matched</p>
              </div>
            </div>

          </div>

          <div className="mt-4 p-4 border border-white/5 bg-white/5 rounded-2xl text-center text-xs text-mist-400 font-light">
            * Dispatch schedules, vehicle routing vectors, and buyer escrow statuses update dynamically.
          </div>
        </Panel>
      </div>
    </SlideShell>
  )
}
