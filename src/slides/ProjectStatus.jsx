import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'

const statuses = [
  {
    title: 'BUDDHI',
    status: 'Training AI Models',
    progress: 75,
    desc: 'Compiling large datasets of crop diseases and training the neural network for higher confidence scoring.'
  },
  {
    title: 'FIONTAR',
    status: 'Business Modeling',
    progress: 40,
    desc: 'Finalizing the Hardware-as-a-Service (HaaS) pricing structure and pitching to local greenhouse owners.'
  },
  {
    title: 'TALOS',
    status: 'Hardware Prototyping',
    progress: 25,
    desc: 'Building the physical robot chassis and testing obstacle detection sensors in controlled dirt environments.'
  },
  {
    title: 'PEGASUS',
    status: 'Drone Integration',
    progress: 60,
    desc: 'Connecting to drone APIs for automated flight paths and real-time image transmission to the server.'
  },
  {
    title: 'PROMETHIA',
    status: 'Algorithm Dev',
    progress: 80,
    desc: 'Implementing graph algorithms (like A* and TSP) to generate the most efficient routes for Talos.'
  },
  {
    title: 'MERCATUS',
    status: 'Dashboard UI',
    progress: 50,
    desc: 'Designing the financial dashboard to visualize water savings, fertilizer costs, and overall ROI.'
  }
]

export default function ProjectStatus() {
  return (
    <SlideShell
      kicker="Development"
      title="Project Status"
      subtitle="Current engineering progress on the AGROGUARD 360 ecosystem components."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-y-auto pb-20 pr-2">
        {statuses.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="bg-charcoal-900/50 border border-mist-500/10 rounded-2xl p-6 flex flex-col hover:bg-charcoal-900 transition-colors"
          >
            <h3 className="font-display text-xl font-bold text-mist-100 mb-1">{s.title}</h3>
            <div className="font-mono text-xs uppercase tracking-widest text-gold-400 mb-4">{s.status}</div>
            
            <p className="text-sm text-mist-300 leading-relaxed mb-8 flex-grow">{s.desc}</p>
            
            <div className="w-full bg-charcoal-950 border border-white/5 rounded-full h-2 mb-3 overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${s.progress}%` }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 1.2, ease: 'easeOut' }}
                className="bg-gradient-to-r from-field-500 to-field-400 h-full rounded-full shadow-[0_0_10px_rgba(95,184,126,0.5)]"
              />
            </div>
            
            <div className="flex justify-between items-center font-mono text-[10px] text-mist-500 uppercase tracking-wider">
              <span>Progress</span>
              <span className="text-field-300">{s.progress}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  )
}
