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

        <div className="flex flex-col gap-4">
          <Panel className="p-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Function</div>
            <p className="text-sm leading-relaxed text-mist-200">
              When Pegasus and Buddhi identify multiple problem areas, Promethia calculates an efficient route for Talos to visit them.
            </p>
          </Panel>
          <Panel className="p-4 flex-grow">
             <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Impact</div>
             <p className="text-sm leading-relaxed text-mist-200 mb-4">
               Instead of the robot randomly travelling around the farm, this demonstrates the use of pathfinding, graph algorithms and route optimization in a real agricultural problem.
             </p>
             <MetricCard label="Efficiency Gain" value="47" unit="%" accent="gold" />
          </Panel>
        </div>
      </div>
    </SlideShell>
  )
}
