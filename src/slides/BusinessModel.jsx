import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { Icon } from '../utils/iconMap.jsx'
import { REVENUE_STREAMS } from '../data/content.js'

export default function BusinessModel() {
  return (
    <SlideShell
      kicker="Phase 07 · Startup/Product Module"
      title="🚀 FIONTAR"
      subtitle="Converts the technical project into a potential commercial product."
    >
      <div className="flex flex-col lg:flex-row h-full gap-4">
        
        <div className="flex-1 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 overflow-y-auto scrollbar-none">
          <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-6 border-b border-white/10 pb-2">Target Customers & Pilot Pipeline</h4>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Small/medium farmers (10-50 acres)
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Greenhouse Operations
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> High-value organic farms
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Agricultural cooperatives
            </div>
          </div>
          
          <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mb-4 border-b border-white/10 pb-2">Value Realization Metrics</h4>
          <ul className="text-sm text-mist-200 space-y-2.5 ml-4 list-disc marker:text-mist-500">
            <li><strong>Labor Overhead:</strong> Drops manual inspection frequency from daily to bi-weekly.</li>
            <li><strong>Crop Preservation:</strong> Intervenes 3-5 days before structural plant rot sets in.</li>
            <li><strong>Chemical/Water Savings:</strong> Restricts chemical spray bounds to an exact 2m radial block around identified vectors.</li>
            <li><strong>Resource Optimization:</strong> Prevents excessive pump cycles on healthy zones.</li>
          </ul>
        </div>

        <div className="flex-1 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 overflow-y-auto scrollbar-none">
          <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-6 border-b border-white/10 pb-2">Business Models & Tiers</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">1. Hardware Package (CAPEX)</h5>
              <p className="text-sm text-mist-300">One-time bundle sale of PEGASUS drone + TALOS ground robot + base docking station (~$2,499 unit cost).</p>
            </div>
            
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">2. SaaS Monitoring Subscription</h5>
              <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-3 rounded border border-white/5 space-y-2">
                <div className="flex justify-between"><span>Basic AI Diagnostics</span><span className="text-field-300">$19/acre/mo</span></div>
                <div className="flex justify-between"><span>Advanced Diagnostic + Path Sync</span><span className="text-gold-400">$49/acre/mo</span></div>
              </div>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">3. Monitoring-as-a-Service (MaaS)</h5>
              <p className="text-sm text-mist-300">Lease option for zero upfront costs. Farmers pay a seasonal fee ($150-$250/acre/season) for full system maintenance, operations, and analytics reports.</p>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">4. Support & Maintenance Contract</h5>
              <p className="text-sm text-mist-300">Annual servicing, hardware calibration, and battery replacements ($299/year).</p>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-center">
        <StatusBadge variant="neutral">Example pricing model — figures shown for illustration only</StatusBadge>
      </div>
    </SlideShell>
  )
}
