import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene from '../components/scene/FarmScene.jsx'

export default function Problem() {
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
        
        <div className="flex-1 rounded-md border border-mist-500/15 bg-charcoal-900/70 p-8 backdrop-blur-sm overflow-y-auto scrollbar-none">
          <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-6 border-b border-white/10 pb-2">Core Concept & Target Scale</h4>
          <p className="text-xl leading-relaxed text-mist-200 mb-6 font-light">
            AGROGUARD 360 is optimized for a 5 to 10-acre pilot farm layout (e.g., high-value row crops like Solanaceae/tomato or cotton) using automated detection-to-action control loops.
          </p>
          <ul className="text-lg text-mist-300 space-y-3 ml-4 list-disc marker:text-mist-500 mb-8">
            <li><strong>Automated Drone Surveys:</strong> Reduces inspection manual labor by up to 80% through systematic autonomous aerial imaging.</li>
            <li><strong>Ground-Truth Inspection:</strong> Targets localized chemical/irrigation delivery to reduce overall herbicide and water usage by 25-30%.</li>
            <li><strong>Closed-Loop System:</strong> Aerial anomaly detection directly feeds into path planning to coordinate ground action without human oversight.</li>
          </ul>
          
          <div className="bg-charcoal-950/60 p-4 rounded-xl border border-gold-500/20 shadow-inner inline-block">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-500 block mb-2">Automated Control Loop</span>
            <div className="font-mono text-sm text-gold-300 flex items-center gap-2 flex-wrap">
              <span>1. Drone Scan</span> <span className="text-mist-500">→</span> 
              <span>2. AI Inference</span> <span className="text-mist-500">→</span> 
              <span>3. Severity Priority</span> <span className="text-mist-500">→</span> 
              <span>4. Path Planning (A*)</span> <span className="text-mist-500">→</span> 
              <span>5. Robotic Action</span> <span className="text-mist-500">→</span> 
              <span>6. Cost/ROI Audit</span>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-md border border-mist-500/15 bg-charcoal-900/70 p-8 backdrop-blur-sm overflow-y-auto scrollbar-none">
          <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mb-6 border-b border-white/10 pb-2">System Integration Details</h4>
          <p className="text-sm leading-relaxed text-mist-300 space-y-4">
            <span className="block mb-3">AGROGUARD 360 is an integrated, low-cost precision agriculture ecosystem. Aerial monitoring is handled by <strong>PEGASUS</strong> (Pixhawk-controlled quadcopter) which executes grid surveys at a 15m altitude to achieve sub-centimeter Ground Sample Distance (GSD).</span>
            <span className="block mb-3">Captured images are wirelessly transferred for computer vision analysis on <strong>BUDDHI</strong>, a YOLOv8-based model trained on annotated crop disease datasets (PlantVillage + regional additions) to classify localized stress types (late blight, early blight, water deficit) and generate coordinate zones.</span>
            <span className="block mb-3">The detected zones are fed into a priority algorithm weighting disease risk, AI confidence, and distance. <strong>PROMETHIA</strong> takes the highest-priority zone and uses the A* algorithm on a discrete 2D grid of the farm to calculate the absolute shortest path avoiding physical obstacles (irrigation pipes, fences).</span>
            <span className="block mb-3">The optimized path coordinates are transmitted via Bluetooth/Wi-Fi to <strong>TALOS</strong>, an Arduino-based 4WD ground robot. TALOS navigates using HC-SR04 ultrasonic sensors for obstacle avoidance, reads capacitive soil moisture at the target site, and triggers targeted pump-action irrigation.</span>
            <span className="block mt-6 p-4 bg-white/5 border border-white/10 rounded-lg text-field-200 italic">
              "The drone identifies the problem from the air, the AI deciphers it, the route optimizer navigates, the robot intervenes, and financial analytics computes the real savings."
            </span>
          </p>
        </div>

      </div>
    </SlideShell>
  )
}
