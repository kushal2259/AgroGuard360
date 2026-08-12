import { motion } from 'framer-motion'
import { CheckCircle2, TrendingDown, Users, Box, Banknote } from 'lucide-react'
import SlideShell from '../components/SlideShell.jsx'
import Panel from '../components/hud/Panel.jsx'

const CUSTOMERS = ['Farmers', 'Agricultural Companies', 'Greenhouses', 'Government/Agri Organizations']
const REVENUE = ['Hardware', 'Subscription', 'Farm Monitoring Services']

export default function Fiontar() {
  return (
    <SlideShell
      kicker="Phase 02 · Business Model"
      title="💡 FIONTAR"
      subtitle="AgroGuard Startup — Turning the technology into a real-world precision agriculture product."
    >
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-5 justify-center">
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400 flex items-center gap-2"><Users size={14}/> Target Customers</div>
            <div className="grid grid-cols-2 gap-3">
              {CUSTOMERS.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-2 rounded-md border border-mist-500/15 bg-charcoal-900/60 px-3 py-4"
                >
                  <span className="text-sm leading-tight text-mist-200">{u}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Panel className="flex flex-col justify-center gap-6 p-8">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              <Banknote size={14} className="text-field-300" /> Revenue Model
            </div>
            <ul className="space-y-4">
              {REVENUE.map((v, i) => (
                <motion.li
                  key={v}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-3 text-lg text-mist-100"
                >
                  <CheckCircle2 size={20} className="shrink-0 text-gold-400" />
                  {v}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-6 border-t border-mist-500/10">
             <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Project Part</div>
             <p className="text-sm leading-relaxed text-mist-200">
               Fiontar represents the business side of AGROGUARD 360. It converts the technology into a real-world precision agriculture product combining AI, drones, robots, and farm analytics.
             </p>
          </div>
        </Panel>
      </div>
    </SlideShell>
  )
}
