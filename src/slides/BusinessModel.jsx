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
          <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-6 border-b border-white/10 pb-2">Target Customers</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Small/medium farmers
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Large farms
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Greenhouses
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Agricultural companies
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Farmer organizations
            </div>
            <div className="flex items-center gap-3 text-mist-200 bg-white/5 p-3 rounded">
              <span className="w-2 h-2 rounded-full bg-field-400"></span> Government/research
            </div>
          </div>
          
          <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mt-8 mb-4 border-b border-white/10 pb-2">Value Proposition</h4>
          <ul className="text-sm text-mist-200 space-y-2 ml-4 list-disc marker:text-mist-500">
            <li>Early crop-problem detection.</li>
            <li>Reduced manual monitoring.</li>
            <li>Targeted intervention.</li>
            <li>Resource optimization.</li>
            <li>Potential labour savings.</li>
          </ul>
        </div>

        <div className="flex-1 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 overflow-y-auto scrollbar-none">
          <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-6 border-b border-white/10 pb-2">Business Models</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">Hardware Sale</h5>
              <p className="text-sm text-mist-300">One-time hardware sale of Drone + Robot + Systems.</p>
            </div>
            
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">Subscription</h5>
              <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-2 rounded border border-white/5 space-y-1">
                <div>AI monitoring.</div>
                <div>Reports & Analytics.</div>
                <div>Software updates.</div>
                <div>Maintenance.</div>
              </div>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">Monitoring-as-a-Service</h5>
              <p className="text-sm text-mist-300">Farmer pays a monthly/seasonal fee. AGROGUARD provides full monitoring and analytics.</p>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-mist-100 mb-2">Maintenance</h5>
              <p className="text-sm text-mist-300">Ongoing technical support and servicing.</p>
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
