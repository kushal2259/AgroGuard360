import SlideShell from '../components/SlideShell.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import Panel from '../components/hud/Panel.jsx'
import { Cpu, ListTodo, HelpCircle } from 'lucide-react'

export default function BuddhiDecisions() {
  return (
    <SlideShell
      kicker="Phase 04 · Decision Engine"
      title="🧠 BUDDHI DECISION SCHEDULER"
      subtitle="Priority calculations index risk severity and confidence to coordinate robot dispatch."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        
        {/* Left Column: Decision formulation */}
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[50px] pointer-events-none" />
          
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-2">Priority Scheduling Matrix</h3>
            <p className="text-xs text-mist-400 font-light mb-4">Combines plant stress threat levels against distance vectors to optimize dispatch path sequencing.</p>
          </div>

          <div className="bg-charcoal-950/70 p-5 rounded-2xl border border-white/5 space-y-3">
            <span className="font-mono text-xs text-mist-500 uppercase tracking-widest block">Core Decision Formula</span>
            <div className="font-mono text-sm text-gold-300 text-center py-3 bg-black/40 border border-white/5 rounded-xl font-bold tracking-wide">
              Score = 0.40(Severity) + 0.30(Urgency) + 0.15(Confidence) − 0.15(Distance_Norm)
            </div>
            <p className="text-[11px] text-mist-400 leading-normal font-light">
              * Resolves the coordinate dispatch priority. Ensures TALOS doesn't simply visit the closest zone first, but rather targets the most critical threat.
            </p>
          </div>

          <div className="mt-4 p-4 bg-white/5 border border-white/5 rounded-2xl flex gap-3 items-center">
            <HelpCircle size={18} className="text-gold-400 shrink-0" />
            <span className="text-[10px] text-mist-400 leading-relaxed font-light">
              By separating priority calculations from pathfinding, the AI core maintains optimal crop-saving efficiency even when multiple zones report distress simultaneously.
            </span>
          </div>
        </div>

        {/* Right Column: AI Action Queue */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none pr-1">
          <div className="grid grid-cols-2 gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Active Alerts" value="3" accent="danger" />
            <MetricCard label="Queue State" value="Sorted" accent="field" />
          </div>

          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-field-400 mb-3 border-b border-white/10 pb-2">📋 Real-Time Sorting Queue</h4>
              <p className="text-mist-300 leading-relaxed font-light mb-3">
                Decisions currently in the queue, compiled by fusing sensor data and crop visual stress profiles:
              </p>
              
              <ul className="space-y-2 font-mono text-[11px]">
                <li className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-red-400 font-bold">1. Zone C (Late Blight)</span>
                  <span className="text-red-300">Score: 4.85</span>
                </li>
                <li className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-gold-400 font-bold">2. Zone D (Water Stress)</span>
                  <span className="text-gold-300">Score: 3.10</span>
                </li>
                <li className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-emerald-400">3. Zone E (Pest Risk)</span>
                  <span className="text-emerald-300">Score: 2.85</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-charcoal-950/40 border border-white/5 rounded-xl text-center text-mist-400 text-[10px]">
              * Automated dispatch triggers: <span className="text-field-300">"Send TALOS to Zone C"</span>
            </div>
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
