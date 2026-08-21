import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene from '../components/scene/FarmScene.jsx'
import { Cpu, Plane, Compass, Bot, BarChart3, AlertOctagon } from 'lucide-react'

const WORKFLOW_STEPS = [
  {
    step: "1. Drone Scan",
    module: "PEGASUS",
    icon: <Plane size={18} />,
    color: "text-sky-400 border-sky-400/20 bg-sky-400/5",
    desc: "Autonomous F450 quadcopter sweeps rows at a 15m altitude, capturing sub-centimeter crop leaf imaging frames and logging telemetry."
  },
  {
    step: "2. AI Inference",
    module: "BUDDHI",
    icon: <Cpu size={18} />,
    color: "text-gold-400 border-gold-400/20 bg-gold-400/5",
    desc: "Inference server runs YOLOv8n object detection on the GSD frames, classifying blight infections or water stress with localized coordinates."
  },
  {
    step: "3. Severity Priority",
    module: "SCHEDULER",
    icon: <AlertOctagon size={18} />,
    color: "text-red-400 border-red-400/20 bg-red-400/5",
    desc: "Calculates priority risk score indexing disease severity, confidence, and distance to optimal coordinate routing sequence."
  },
  {
    step: "4. Path Planning",
    module: "PROMETHIA",
    icon: <Compass size={18} />,
    color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    desc: "Generates cost-optimized A* trajectories over the row grid using Manhattan distance calculations to avoid obstacles."
  },
  {
    step: "5. Robotic Action",
    module: "TALOS",
    icon: <Bot size={18} />,
    color: "text-field-400 border-field-400/20 bg-field-400/5",
    desc: "Arduino 4WD rover travels to target coordinates using ultrasonic distance collision sensors. Calibrates local capacitive moisture and triggers MOSFET pump irrigation."
  },
  {
    step: "6. Cost/ROI Audit",
    module: "MERCATUS",
    icon: <BarChart3 size={18} />,
    color: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    desc: "Audits operational metrics (liters sprayed, battery depletion, manual labor delta) to compute capital payback and seasonal farm ROI."
  }
]

export default function Problem() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <SlideShell
      kicker="Section 1"
      title="PROJECT OVERVIEW"
      subtitle="Smart agriculture and precision-farming system."
      background={
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <FarmScene variant="topdown" className="h-full w-full" />
        </div>
      }
    >
      <div className="flex flex-col lg:flex-row h-full gap-6">
        
        <div className="flex-1 flex flex-col bg-charcoal-900/70 border border-mist-500/15 rounded-3xl p-5 backdrop-blur-sm relative overflow-y-auto scrollbar-none max-h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[50px] pointer-events-none" />
          
          <h4 className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-4 border-b border-white/10 pb-1.5">Core Concept & Target Scale</h4>
          <p className="text-sm leading-relaxed text-mist-200 mb-4 font-light">
            AGROGUARD 360 is optimized for a 5 to 10-acre pilot farm layout (e.g., high-value row crops like Solanaceae/tomato or cotton) using automated detection-to-action control loops.
          </p>
          <ul className="text-xs text-mist-300 space-y-2 ml-4 list-disc marker:text-mist-500 flex-grow">
            <li><strong>Automated Drone Surveys:</strong> Reduces inspection manual labor by up to 80% through systematic autonomous aerial imaging.</li>
            <li><strong>Ground-Truth Inspection:</strong> Targets localized chemical/irrigation delivery to reduce overall herbicide and water usage by 25-30%.</li>
            <li><strong>Closed-Loop System:</strong> Aerial anomaly detection directly feeds into path planning to coordinate ground action without human oversight.</li>
          </ul>
          
          {/* Interactive Block Diagram Nodes */}
          <div className="mt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-500 block mb-2">Interactive System Control Loop</span>
            <div className="grid grid-cols-3 gap-2">
              {WORKFLOW_STEPS.map((step, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                    activeStep === i
                      ? `${step.color} border-gold-400 scale-[1.03] shadow-[0_0_10px_rgba(232,185,85,0.2)]`
                      : 'border-white/5 bg-white/5 text-mist-400 hover:border-white/15 hover:bg-white/10'
                  }`}
                >
                  <div className="mb-1">{step.icon}</div>
                  <span className="text-[9px] font-mono font-bold leading-tight">{step.step.split('. ')[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Dynamic Subsystem Details */}
        <div className="flex-1 flex flex-col bg-charcoal-900/70 border border-mist-500/15 rounded-3xl p-8 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-field-500/5 blur-[80px] pointer-events-none" />
          
          <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mb-6 border-b border-white/10 pb-2">Subsystem Dynamic Diagnostics</h4>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-grow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {WORKFLOW_STEPS[activeStep].icon}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-mist-500 uppercase tracking-widest">subsystem {WORKFLOW_STEPS[activeStep].module}</span>
                    <h3 className="text-xl font-display font-medium text-white tracking-tight">{WORKFLOW_STEPS[activeStep].step}</h3>
                  </div>
                </div>
                
                <p className="text-base text-mist-300 leading-relaxed font-light mb-6">
                  {WORKFLOW_STEPS[activeStep].desc}
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500 block mb-2">Integration Protocol</span>
                <span className="text-xs text-field-300 font-mono">
                  {activeStep === 0 && 'Pixhawk Telemetry → ArduPilot Waypoints → 915MHz MAVLink payload'}
                  {activeStep === 1 && 'YOLOv8n PyTorch Tensor → classes identification → bounding coordinates'}
                  {activeStep === 2 && 'Priority Scoring Matrix [severity, risk multiplier, distance vectors]'}
                  {activeStep === 3 && '2D Discrete Cost Mapping → A* traversal nodes f(n) = g(n) + h(n)'}
                  {activeStep === 4 && 'Bluetooth HC-05 serial sync → differential wheel speeds → Capacitive read'}
                  {activeStep === 5 && 'Audit dashboard logging → liters usage savings delta → payback period ROI'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-mist-500 mt-6 leading-relaxed border-t border-white/5 pt-4">
            * Drone coordinates and diagnosed anomalies synchronise directly to the robot navigation route.
          </p>
        </div>

      </div>
    </SlideShell>
  )
}
