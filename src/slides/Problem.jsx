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
          <h4 className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-6 border-b border-white/10 pb-2">Core Concept</h4>
          <p className="text-xl leading-relaxed text-mist-200 mb-6 font-light">
            AGROGUARD 360 combines AI + drone + ground robot + path planning + sensors + financial analytics + business model.
          </p>
          <ul className="text-lg text-mist-300 space-y-3 ml-4 list-disc marker:text-mist-500 mb-8">
            <li>Main purpose: reduce manual crop monitoring and unnecessary resource usage.</li>
            <li>Detects crop problems, identifies affected zones, prioritizes them.</li>
            <li>Sends a robot to the target and performs ground-level inspection/action.</li>
          </ul>
          
          <div className="bg-charcoal-950/60 p-4 rounded-xl border border-gold-500/20 shadow-inner inline-block">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-500 block mb-2">Workflow Loop</span>
            <div className="font-mono text-sm text-gold-300 flex items-center gap-2 flex-wrap">
              <span>Detection</span> <span className="text-mist-500">→</span> 
              <span>Analysis</span> <span className="text-mist-500">→</span> 
              <span>Priority</span> <span className="text-mist-500">→</span> 
              <span>Navigation</span> <span className="text-mist-500">→</span> 
              <span>Action</span> <span className="text-mist-500">→</span> 
              <span>Financial Evaluation</span>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-md border border-mist-500/15 bg-charcoal-900/70 p-8 backdrop-blur-sm overflow-y-auto scrollbar-none">
          <h4 className="font-mono text-sm uppercase tracking-widest text-field-400 mb-6 border-b border-white/10 pb-2">System Summary</h4>
          <p className="text-sm leading-relaxed text-mist-300 space-y-4">
            <span className="block mb-3">AGROGUARD 360 is a low-cost smart agriculture system designed around a detection-to-action workflow.</span>
            <span className="block mb-3"><strong>PEGASUS</strong>, our monitoring drone, captures crop images from above. These images are processed by <strong>BUDDHI</strong>, our AI module, using a lightweight YOLO-based object-detection approach to identify crop problems and their locations.</span>
            <span className="block mb-3">The detected zones are prioritized according to factors such as severity and urgency. <strong>PROMETHIA</strong> then uses the A* algorithm on a farm grid to calculate an efficient route for <strong>TALOS</strong>, our 4WD ground robot.</span>
            <span className="block mb-3">TALOS follows the route using Arduino-based motor control and ultrasonic obstacle detection, reaches the affected zone, checks soil moisture and can perform targeted irrigation.</span>
            <span className="block mb-3">The operational data is then passed to <strong>MERCATUS</strong>, which calculates resource usage, estimated savings and ROI. Finally, <strong>FIONTAR</strong> represents the complete system as a potential commercial agriculture product or service.</span>
            <span className="block mt-6 p-4 bg-white/5 border border-white/10 rounded-lg text-field-200 italic">
              "Drone finds the problem, AI understands it, path planning decides how to reach it, robot takes ground-level action, and financial analytics evaluates the benefit."
            </span>
          </p>
        </div>

      </div>
    </SlideShell>
  )
}
