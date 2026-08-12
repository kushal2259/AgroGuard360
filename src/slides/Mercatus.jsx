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
      kicker="Phase 06 · Financial Analytics"
      title="📈 MERCATUS"
      subtitle="Farm Financial Analytics — Measurable economic value for farmers."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Water Usage" value="-24" unit="%" accent="field" />
            <MetricCard label="Fertilizer Cost" value="-18" unit="%" accent="gold" />
            <MetricCard label="Drone/Robot Cost" value="Minimal" accent="field" />
            <MetricCard label="Expected ROI" value="31" unit="%" accent="gold" />
          </div>

          <Panel className="p-5 flex-grow flex flex-col justify-center">
             <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Project Part</div>
             <p className="text-sm leading-relaxed text-mist-200">
               Mercatus connects the technology to the financial impact on the farm.
               This shows that AGROGUARD 360 is not only about technology — it is designed to demonstrate how technology can create measurable economic value for farmers.
             </p>
          </Panel>
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
                {currency}{withoutSystem.toLocaleString('en-IN')}
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
                {currency}{withSystem.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-charcoal-700">
              <motion.div
                className="h-full rounded-full bg-field-400"
                initial={{ width: 0 }}
                animate={{ width: `${(withSystem / maxVal) * 100}%` }}
                transition={{ duration: 0.9, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gold-400/30 bg-gold-500/10 p-6 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Estimated Savings</div>
            <div className="mt-2 font-display text-5xl font-bold text-gold-300">
              {currency}{savings.toLocaleString('en-IN')}
            </div>
          </div>
        </Panel>
      </div>
    </SlideShell>
  )
}
