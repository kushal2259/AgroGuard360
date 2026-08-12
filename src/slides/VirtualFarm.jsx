import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene from '../components/scene/FarmScene.jsx'
import ScanPulse from '../components/scene/ScanPulse.jsx'
import Panel from '../components/hud/Panel.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'
import { VIRTUAL_FARM_ZONES } from '../data/content.js'

const TONE_COLOR = { field: '#5fb87e', gold: '#e8b955', danger: '#e05c5c' }

export default function VirtualFarm() {
  const [activeId, setActiveId] = useState(null)
  const active = VIRTUAL_FARM_ZONES.find((z) => z.id === activeId)

  return (
    <SlideShell
      kicker="Interactive Simulation"
      title="VIRTUAL FARM"
      subtitle="Select a zone to inspect live indicators across the field."
    >
      <div className="relative h-full w-full overflow-hidden rounded-md border border-mist-500/15">
        <motion.div
          className="absolute inset-0"
          animate={
            active
              ? { scale: 1.15, x: `${(50 - active.x) * 0.5}%`, y: `${(50 - active.y) * 0.5}%` }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <FarmScene variant="topdown" className="h-full w-full" />
        </motion.div>

        <div className="pointer-events-none absolute left-4 top-4 z-10">
          <StatusBadge variant="demo">Virtual Farm · Simulation</StatusBadge>
        </div>

        {VIRTUAL_FARM_ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => setActiveId(z.id === activeId ? null : z.id)}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 p-2"
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
          >
            <span className="relative flex h-9 w-9 items-center justify-center">
              <ScanPulse size={56} color={TONE_COLOR[z.metric.tone]} rings={2} duration={2.4} className="absolute" />
              <span
                className={`relative flex h-3.5 w-3.5 rounded-full border-2 transition-transform group-hover:scale-125 ${
                  activeId === z.id ? 'scale-125' : ''
                }`}
                style={{ backgroundColor: TONE_COLOR[z.metric.tone], borderColor: '#f4f6f3' }}
              />
            </span>
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-mist-300 opacity-0 transition-opacity group-hover:opacity-100">
              {z.label}
            </span>
          </button>
        ))}

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35 }}
              className="absolute right-4 top-4 z-20 w-64"
            >
              <Panel className="p-4">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">
                  {active.label} Zone
                </div>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold text-mist-100">{active.metric.value}</span>
                  <span className="text-xs text-mist-500">{active.metric.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-mist-300">{active.detail}</p>
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && (
          <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
            {VIRTUAL_FARM_ZONES.slice(0, 3).map((z) => (
              <StatusBadge key={z.id} variant="neutral">
                {z.metric.label}: {z.metric.value}
              </StatusBadge>
            ))}
          </div>
        )}
      </div>
    </SlideShell>
  )
}
