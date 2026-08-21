import SlideShell from '../components/SlideShell.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { Droplet, Info, Settings } from 'lucide-react'

export default function SmartIrrigation() {
  return (
    <SlideShell
      kicker="Phase 07 · Irrigation Automation"
      title="💦 SMART IRRIGATION PIPELINE"
      subtitle="Closed-loop micro-drip networks limit water delivery to needy crop zones only."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        
        {/* Left Column: Visual Flow */}
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] pointer-events-none" />
          
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-2">Automated Water Delivery</h3>
            <p className="text-xs text-mist-400 font-light mb-4">Coordinates pump speed and zone solenoid status based on live soil moisture reports.</p>
          </div>

          <div className="p-5 bg-charcoal-950/70 rounded-2xl border border-white/5 space-y-4">
            <span className="font-mono text-xs text-mist-500 uppercase tracking-widest block">Flow Pipeline Automation</span>
            
            <div className="grid grid-cols-3 gap-2 font-mono text-[9px] text-center">
              <div className="p-2 border border-white/10 bg-white/5 rounded-xl">
                <span className="text-sky-300 block font-bold">1. PROBE CALIB</span>
                <span>Reads soil moisture &lt; 28%</span>
              </div>
              <div className="p-2 border border-white/10 bg-white/5 rounded-xl">
                <span className="text-sky-300 block font-bold">2. VALVE TRIGGER</span>
                <span>Solenoid opens target zone line</span>
              </div>
              <div className="p-2 border border-white/10 bg-white/5 rounded-xl">
                <span className="text-sky-300 block font-bold">3. PUMP RUN</span>
                <span>Pushes water; shuts off once wet (&gt;68%)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-xl flex gap-2.5 items-center">
            <Info size={16} className="text-sky-400 shrink-0" />
            <span className="text-[10px] text-mist-400 leading-normal font-light">
              By confining water flow to target sub-sections, we conserve up to 24% water compared to broadcast sprinklers.
            </span>
          </div>
        </div>

        {/* Right Column: Hardware Specs */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none pr-1">
          <div className="grid grid-cols-2 gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Pump Status" value="Online" accent="field" />
            <MetricCard label="Control" value="Auto-PID" accent="gold" />
          </div>

          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-3 border-b border-white/10 pb-2">💧 Smart Irrigation Hardware</h4>
              <p className="text-mist-300 leading-relaxed font-light">
                AGROGUARD 360 integrates an industrial micro-drip network directly governed by the AI intelligence engine.
              </p>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-field-400 border-b border-white/5 pb-1 mb-2">Key Hardware Elements</h5>
              <ul className="space-y-1 list-disc ml-4 text-mist-300 font-light">
                <li><strong>Pressurized Reservoir:</strong> Main storage tank equipped with electronic depth gauges.</li>
                <li><strong>Micro Solenoids:</strong> Dedicated line valves opening individual crop rows.</li>
                <li><strong>Submersible Pump:</strong> Geared DC water pump driven via an IRF520 MOSFET.</li>
                <li><strong>Zone Controllers:</strong> Local MCU controllers mapping flow paths.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
