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

        <Panel className="flex flex-col justify-center gap-6 p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              Financial Impact Simulation
            </div>
            <StatusBadge variant="demo">Demo Data</StatusBadge>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm text-mist-300">
              <span>Traditional farming cost</span>
              <span className="font-mono text-red-300 font-bold">
                $12,500
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-charcoal-700">
              <motion.div
                className="h-full rounded-full bg-red-400/80"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm text-mist-300">
              <span>AGROGUARD-assisted cost</span>
              <span className="font-mono text-field-200 font-bold">
                $8,200
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-charcoal-700">
              <motion.div
                className="h-full rounded-full bg-field-400"
                initial={{ width: 0 }}
                animate={{ width: `${(8200 / 12500) * 100}%` }}
                transition={{ duration: 0.9, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gold-400/30 bg-gold-500/10 p-6 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Estimated Savings</div>
            <div className="mt-2 font-display text-5xl font-bold text-gold-300">
              +$4,300
            </div>
          </div>
        </Panel>
      </div>
    </SlideShell>
  )
}
