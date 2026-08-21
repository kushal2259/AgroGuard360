import SlideShell from '../components/SlideShell.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import Panel from '../components/hud/Panel.jsx'
import { Truck, MapPin } from 'lucide-react'

export default function MercatusLogistics() {
  return (
    <SlideShell
      kicker="Phase 08 · Logistics & Delivery"
      title="🚚 SUPPLY CHAIN LOGISTICS"
      subtitle="Automated post-harvest transport tracking produce from farm silo to regional market hubs."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        
        {/* Left Column: Logistics Pipeline */}
        <Panel className="flex flex-col justify-center gap-6 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              Supply Chain Pipeline
            </div>
            <StatusBadge variant="active" pulse>Logistics Active</StatusBadge>
          </div>

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
        </Panel>

        {/* Right Column: Specs */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none pr-1">
          <div className="grid grid-cols-2 gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Vehicle ID" value="GJ-01-X" accent="gold" />
            <MetricCard label="Cargo Load" value="850 KG" accent="field" />
          </div>

          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">🚚 Transport Logistics</h4>
              <p className="text-mist-300 leading-relaxed font-light mb-2">
                Conveys packed inventory from physical farm lockers directly to retail wholesalers without manual intervention.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-charcoal-950/40 border border-white/5 rounded-xl">
                <span className="text-[10px] font-mono text-mist-500 block uppercase mb-1">Destination</span>
                <span className="text-xs text-mist-200">Ahmedabad wholesale grain exchange hub</span>
              </div>
              <div className="p-3 bg-charcoal-950/40 border border-white/5 rounded-xl">
                <span className="text-[10px] font-mono text-mist-500 block uppercase mb-1">Estimated Travel time</span>
                <span className="text-xs text-mist-200">~ 4.5 hours in transit</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
