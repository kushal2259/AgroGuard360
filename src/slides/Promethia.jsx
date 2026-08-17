import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import Panel from '../components/hud/Panel.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'

export default function Promethia() {
  return (
    <SlideShell
      kicker="Phase 05 · Path Optimization"
      title="💻 PROMETHIA"
      subtitle="Farm Route Optimizer — Calculates efficient routes to visit problem areas."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-charcoal-900 p-8 flex flex-col justify-center">
          <div className="text-center font-mono text-xl text-mist-300 mb-8 tracking-widest">
            ROUTE ALGORITHM
          </div>
          
          <div className="space-y-6 text-sm text-field-200 font-mono pl-4">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              Zone A (Healthy)
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="text-danger-400 font-bold border-l-2 border-danger-400 pl-4">
              Zone B (Disease)
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              Zone C (Healthy)
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="text-gold-400 font-bold border-l-2 border-gold-400 pl-4">
              Zone D (Dry)
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="text-amber-400 font-bold border-l-2 border-amber-400 pl-4">
              Zone E (Pest)
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 1.4 }}
            className="mt-12 p-4 bg-charcoal-950 border border-gold-500/30 rounded-lg"
          >
            <div className="text-gold-400 mb-2 font-bold uppercase tracking-wider text-xs">Optimized Route:</div>
            <div className="font-mono text-lg text-mist-100 flex items-center justify-between">
              <span>Robot</span>
              <span className="text-mist-500">→</span>
              <span className="text-danger-400">B</span>
              <span className="text-mist-500">→</span>
              <span className="text-gold-400">D</span>
              <span className="text-mist-500">→</span>
              <span className="text-amber-400">E</span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none h-full pb-8 pr-2">
          
          {/* 5. PROMETHIA — Path Optimization Module */}
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5 h-full">
            <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">5. Path Optimization Module</h4>
            
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Purpose</span>
              <ul className="text-sm text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                <li>Determines how TALOS reaches the selected target.</li>
                <li>Uses a farm grid/map to calculate an efficient route.</li>
                <li>Considers obstacles and movement costs.</li>
                <li>Recalculates route if conditions change.</li>
              </ul>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Algorithm: A* (A-star)</span>
              <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-2 rounded border border-white/5 space-y-1">
                <p>f(n) = g(n) + h(n)</p>
                <p className="text-mist-500">g(n) = cost from starting point</p>
                <p className="text-mist-500">h(n) = estimated cost to destination</p>
                <p className="text-mist-500">f(n) = total estimated cost</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Grid & Costs</span>
              <p className="text-sm text-mist-200 mb-2">
                Normal cell → cost 1.<br/>
                Difficult terrain → higher cost.<br/>
                Obstacle → blocked/infinite cost.
              </p>
              <div className="font-mono text-[11px] text-field-300 bg-charcoal-950/50 p-2 rounded border border-white/5 inline-block">
                TALOS Pos → Farm Grid → A* → Zone B2
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Main Logic Flow</span>
              <div className="font-mono text-[11px] text-gold-300 bg-charcoal-950/50 p-2 rounded border border-white/5 space-y-2">
                <div>BUDDHI = What is wrong?</div>
                <div>Priority = What to handle first?</div>
                <div>PROMETHIA = How do we reach it?</div>
                <div>TALOS = Execute the route.</div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </SlideShell>
  )
}
