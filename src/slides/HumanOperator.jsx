import SlideShell from '../components/SlideShell.jsx'
import FarmScene from '../components/scene/FarmScene.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { Tablet, ShieldAlert, Play, AlertCircle } from 'lucide-react'

export default function HumanOperator() {
  return (
    <SlideShell
      kicker="Phase 03 · Supervisor Interface"
      title="🧑‍🌾 HUMAN OPERATOR CONTROL"
      subtitle="The farmer remains the supervisor, managing the loop via a mobile command tablet."
      background={
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <FarmScene variant="hero" className="h-full w-full" />
        </div>
      }
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        
        {/* Left Panel: Simulated Tablet View */}
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-charcoal-900/60 p-6 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[50px] pointer-events-none" />
          
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Tablet size={16} className="text-gold-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-mist-200">Farmer Command Tablet</span>
            </div>
            <StatusBadge variant="active">Supervisor Connected</StatusBadge>
          </div>

          <div className="space-y-3 flex-grow flex flex-col justify-center">
            <div className="bg-charcoal-950/70 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert size={18} className="text-red-400 animate-pulse" />
                <div>
                  <span className="text-xs text-mist-400 block font-mono">ACTIVE SYSTEM ALERTS</span>
                  <span className="text-xs text-white font-medium">Zone C: Late Blight risk detected by PEGASUS</span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-xl text-[10px] font-mono text-red-300 uppercase font-bold tracking-wider hover:bg-red-500/30 transition-all">
                Acknowledge
              </button>
            </div>

            <div className="bg-charcoal-950/70 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Play size={18} className="text-sky-400" />
                <div>
                  <span className="text-xs text-mist-400 block font-mono">ROBOTIC MISSION TRIGGER</span>
                  <span className="text-xs text-white font-medium">TALOS scheduled for Zone C soil verification</span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-sky-500/20 border border-sky-500/30 rounded-xl text-[10px] font-mono text-sky-300 uppercase font-bold tracking-wider hover:bg-sky-500/30 transition-all">
                Authorize
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-xl flex gap-2 items-center">
            <AlertCircle size={14} className="text-gold-400 shrink-0" />
            <span className="text-[10px] text-mist-400 leading-normal font-light">
              Safety protocols require operator manual confirmation before initiating secondary ground rover actions or targeted water pump overrides.
            </span>
          </div>
        </div>

        {/* Right Panel: Specifications */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none pr-1">
          <div className="grid grid-cols-2 gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Connection" value="915 MHz" accent="gold" />
            <MetricCard label="Override" value="Standby" accent="field" />
          </div>

          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 space-y-4 text-xs">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">🌾 Farmer Supervision role</h4>
              <p className="text-mist-300 leading-relaxed font-light">
                AGROGUARD 360 runs fully autonomously, but places final veto controls in the hands of the operator.
              </p>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-field-400 border-b border-white/5 pb-1 mb-2">Tablet Capabilities</h5>
              <ul className="space-y-2 list-disc ml-4 text-mist-300 font-light">
                <li><strong>Start / Stop drone missions</strong> manually from the charging station.</li>
                <li><strong>View system anomaly alerts</strong> alongside HD video and thermal crop mapping overlays.</li>
                <li><strong>Review AI crop diagnostic suggestions</strong> before deploying ground actions.</li>
                <li><strong>Trigger manual smart irrigation overrides</strong> for any specific zone.</li>
              </ul>
            </div>

            <div className="p-3 bg-charcoal-950/40 border border-white/5 rounded-xl">
              <span className="text-[10px] font-mono text-mist-500 block uppercase mb-1">Safety Equipment</span>
              <span className="text-[10px] text-mist-300">Standard farm attire + operator GCS tablet synchronization link.</span>
            </div>
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
