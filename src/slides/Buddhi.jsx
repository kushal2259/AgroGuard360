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

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none h-full pb-8 pr-2">
          
          {/* 3. BUDDHI — AI Intelligence Module */}
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5">
            <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-3 border-b border-white/10 pb-2">3. AI Intelligence Module (YOLOv8n)</h4>
            
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Purpose</span>
              <ul className="text-sm text-mist-200 space-y-1 ml-4 list-disc marker:text-mist-500">
                <li>Acts as the real-time crop disease diagnostic engine.</li>
                <li>Performs high-speed object detection on 640x640 frame inputs.</li>
                <li>Outputs bound-box localized disease vectors & confidence scores.</li>
                <li>Maps classified anomalies to specific discrete grid cells.</li>
              </ul>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">AI Architecture & Performance</span>
              <p className="text-sm text-mist-200 mb-2">Utilizes a lightweight <strong>YOLOv8n</strong> PyTorch model optimized for CPU execution (~32ms inference latency).</p>
              <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-2.5 rounded border border-white/5 space-y-1">
                <div>Model size: <span className="text-gold-300">~6.4 MB</span> (3.2 Million parameters)</div>
                <div>Validation Metrics: <span className="text-field-300">mAP50: 92.4% | mAP50-95: 84.1%</span></div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Training Dataset Pipeline</span>
              <div className="font-mono text-[11px] text-white bg-charcoal-950/50 p-3 rounded border border-white/5 space-y-2">
                <div>Source: PlantVillage dataset (~5,000 augmented images).</div>
                <div className="text-mist-500 border-t border-white/5 pt-1.5">Augmentations: Random flips, scale rotations, HSV color jitter, and Mosaic mix.</div>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Output Payload Example</span>
              <div className="font-mono text-[11px] text-gold-300 bg-charcoal-950/50 p-2 rounded border border-white/5">
                {`{ zone: "B2", class: "Late_Blight", conf: 0.94, severity: 4, priority: "HIGH" }`}
              </div>
            </div>
          </div>

          {/* 4. PRIORITY MODULE */}
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-5">
            <h4 className="font-mono text-sm uppercase tracking-widest text-red-400 mb-3 border-b border-white/10 pb-2">4. Priority Decision Engine</h4>
            
            <p className="text-sm text-mist-200 mb-3">
              Sorts active detections to decide the optimal sequence of actions. Distinguishes task priority from path planning (A*).
            </p>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Priority Score Formula</span>
              <div className="font-mono text-[10px] text-gold-300 bg-charcoal-950/50 p-3 rounded border border-white/5 leading-relaxed">
                Score = 0.40(Severity) + 0.30(Urgency) + 0.15(Confidence) − 0.15(Distance_Norm)
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-mist-500 block mb-1">Real-Time Sorting Example</span>
              <ul className="font-mono text-[11px] text-white space-y-2 bg-charcoal-950/50 p-3 rounded border border-white/5">
                <li className="flex gap-2 justify-between"><span>B2: Late Blight (Severe)</span><span className="text-red-400">[Score: 4.85]</span></li>
                <li className="flex gap-2 justify-between"><span>D4: Water Deficit (Mild)</span><span className="text-gold-400">[Score: 3.10]</span></li>
                <li className="flex gap-2 justify-between"><span>E1: Leaf Mold (Early)</span><span className="text-field-400">[Score: 1.85]</span></li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </SlideShell>
  )
}
