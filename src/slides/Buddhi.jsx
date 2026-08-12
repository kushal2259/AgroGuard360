import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import Panel from '../components/hud/Panel.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'

const BOXES = [
  { x: 18, y: 22, w: 26, h: 22, label: 'Leaf discoloration', conf: '94.7%', delay: 0.6 },
  { x: 55, y: 46, w: 22, h: 18, label: 'Spot pattern', conf: '87.2%', delay: 1.0 },
  { x: 34, y: 62, w: 18, h: 16, label: 'Leaf curl', conf: '73.5%', delay: 1.4 },
]

export default function Buddhi() {
  return (
    <SlideShell
      kicker="Phase 02 · AI Intelligence"
      title="🧠 BUDDHI"
      subtitle="AI Crop Analysis Engine — computer vision reads what the eye would miss."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15 bg-[radial-gradient(circle_at_30%_20%,#2a7549_0%,#164a30_45%,#0b2118_100%)]">
          <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(120deg,rgba(7,20,16,0.5)_0px,rgba(7,20,16,0.5)_2px,transparent_2px,transparent_22px)]" />
          <div className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-field-200/10 to-transparent">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-transparent via-mist-100/25 to-transparent"
              animate={{ y: ['-10%', '620%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="absolute left-3 top-3">
            <StatusBadge variant="active" pulse>
              Live Vision Feed · Simulation
            </StatusBadge>
          </div>

          {BOXES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: b.delay, duration: 0.4 }}
              className="absolute rounded-sm border-2 border-gold-400/80"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
            >
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-charcoal-950/85 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold-300">
                {b.label} · {b.conf}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Panel className="grid grid-cols-2 gap-4 p-4">
            <MetricCard label="Detection" value="Fungal" unit="infection" accent="danger" className="col-span-2" />
            <MetricCard label="Confidence" value="94.7" unit="%" accent="gold" />
            <MetricCard label="Severity" value="Medium" />
          </Panel>
          <Panel className="p-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Function</div>
            <p className="text-sm leading-relaxed text-mist-200">
              Buddhi is the AI brain of AGROGUARD 360. It analyzes crop images collected by the drone or camera and identifies potential problems such as disease, pest damage, water stress, and unhealthy crops.
            </p>
          </Panel>
          <div className="mt-auto">
            <StatusBadge variant="neutral">Simulated computer-vision output · demo data</StatusBadge>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
