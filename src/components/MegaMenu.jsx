import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { slides } from '../data/slides.js'

const modules = [
  {
    id: 'buddhi',
    title: 'BUDDHI — AI Crop Doctor',
    shortName: 'Buddhi',
    description: 'AI analyzes crop images and detects healthy crop, disease, water stress, and pest damage.',
    features: ['Computer Vision', 'Disease Detection', 'Confidence Scoring'],
    projectStatus: 'Currently training AI Models: Compiling large datasets of crop diseases and training the neural network for higher confidence scoring.'
  },
  {
    id: 'fiontar',
    title: 'FIONTAR — AgroGuard Startup',
    shortName: 'Fiontar',
    description: 'Turn the technology into a real-world product combining AI, drones, robots, and analytics.',
    features: ['Hardware & Subscription', 'Farm Monitoring', 'Target: Farmers & Greenhouses'],
    projectStatus: 'Currently in Business Modeling: Finalizing the Hardware-as-a-Service (HaaS) pricing structure and pitching to local greenhouse owners.'
  },
  {
    id: 'talos',
    title: 'TALOS — Agricultural Robot',
    shortName: 'Talos',
    description: 'Autonomous ground robot travels between rows to inspect crops and carry spray mechanisms.',
    features: ['Obstacle Detection', 'Soil Measurement', 'Targeted Treatment'],
    projectStatus: 'Currently in Hardware Prototyping: Building the physical robot chassis and testing obstacle detection sensors in controlled dirt environments.'
  },
  {
    id: 'pegasus',
    title: 'PEGASUS — Farm Monitoring',
    shortName: 'Pegasus',
    description: 'The eyes in the sky flying over the farm capturing crop images for the AI system.',
    features: ['Crop Health Scanning', 'Dry Area Locating', 'Image Transmission'],
    projectStatus: 'Currently in Drone Integration: Connecting to drone APIs for automated flight paths and real-time image transmission to the server.'
  },
  {
    id: 'promethia',
    title: 'PROMETHIA — Route Optimizer',
    shortName: 'Promethia',
    description: 'Calculates the most efficient route for Talos to visit problem areas detected by Pegasus.',
    features: ['Path Optimization', 'Graph Algorithms', 'Efficiency Maximization'],
    projectStatus: 'Currently in Algorithm Dev: Implementing graph algorithms (like A* and TSP) to generate the most efficient routes for Talos.'
  },
  {
    id: 'mercatus',
    title: 'MERCATUS — Financial Analytics',
    shortName: 'Mercatus',
    description: 'Calculates water usage, fertilizer cost, robot/drone cost, crop savings, and ROI.',
    features: ['Economic Value Analysis', 'Cost Comparison', 'ROI Estimation'],
    projectStatus: 'Currently in Dashboard UI: Designing the financial dashboard to visualize water savings, fertilizer costs, and overall ROI.'
  }
]

export default function MegaMenu({ onGoTo }) {
  const [activeMenu, setActiveMenu] = useState(null)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'status'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleModuleClick = (modId) => {
    setActiveMenu(null)
    setMobileMenuOpen(false)
    const index = slides.findIndex(s => s.id === modId)
    if (index !== -1 && onGoTo) {
      onGoTo(index)
    }
  }

  const handleLogoClick = () => {
    setActiveMenu(null)
    setMobileMenuOpen(false)
    if (onGoTo) onGoTo(0)
  }

  const handlePresentationClick = () => {
    setActiveMenu(null)
    setMobileMenuOpen(false)
    if (onGoTo) onGoTo(1)
  }

  const handleMouseEnter = (modId) => {
    setActiveMenu(modId)
    setActiveTab('overview')
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50" onMouseLeave={() => setActiveMenu(null)}>
      {/* Top Navbar */}
      <div className="relative z-50 flex items-center justify-between px-6 md:px-8 py-4 backdrop-blur-xl bg-charcoal-950/80 border-b border-white/5">
        
        <div className="font-display text-xl font-bold text-mist-100 cursor-pointer" onClick={handleLogoClick}>
          AGROGUARD <span className="text-gold-400">360</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          <button 
            onClick={handlePresentationClick}
            className="text-mist-400 hover:text-white font-mono text-sm uppercase tracking-wider transition-colors mr-4"
          >
            Presentation
          </button>
          
          {modules.map(mod => (
            <div 
              key={mod.id}
              className="h-full py-4 -my-4 flex items-center"
              onMouseEnter={() => handleMouseEnter(mod.id)}
            >
              <button 
                onClick={() => handleModuleClick(mod.id)}
                className={`font-mono text-sm uppercase tracking-widest transition-all duration-300 ${activeMenu === mod.id ? 'text-gold-400 scale-105' : 'text-mist-200 hover:text-white'}`}
              >
                {mod.shortName}
              </button>
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden text-mist-300 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Mega Menu Panel (Valorant Style) */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            className="hidden xl:block absolute top-full left-0 w-full bg-charcoal-950/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {modules.map(mod => mod.id === activeMenu && (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-[1fr_400px] gap-16 items-start"
              >
                <div>
                  <h2 className="font-display text-5xl font-medium text-white mb-8 drop-shadow-lg tracking-tight">
                    {mod.title.split(' — ')[0]} <span className="text-gold-400">— {mod.title.split(' — ')[1]}</span>
                  </h2>
                  
                  {/* Menu inside the Mega Menu */}
                  <div className="flex gap-8 border-b border-white/10 mb-8">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className={`pb-3 font-mono uppercase tracking-widest text-sm transition-all ${activeTab === 'overview' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-mist-400 hover:text-white'}`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => setActiveTab('status')}
                      className={`pb-3 font-mono uppercase tracking-widest text-sm transition-all ${activeTab === 'status' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-mist-400 hover:text-white'}`}
                    >
                      What We Are Doing
                    </button>
                  </div>

                  <div className="h-[120px]">
                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' ? (
                        <motion.p 
                          key="overview"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="text-xl text-mist-300 leading-relaxed max-w-2xl font-light"
                        >
                          {mod.description}
                        </motion.p>
                      ) : (
                        <motion.p 
                          key="status"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="text-xl text-field-200 leading-relaxed max-w-2xl font-light"
                        >
                          {mod.projectStatus}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-8">
                    <button 
                      onClick={() => handleModuleClick(mod.id)}
                      className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-widest transition-all hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(232,185,85,0.4)] hover:scale-105"
                    >
                      Initialize Module <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-field-400 mb-6">Core Capabilities</h4>
                  <ul className="space-y-5">
                    {mod.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-4 text-white">
                        <div className="w-10 h-10 rounded-full bg-field-500/20 flex items-center justify-center text-field-400 font-mono text-sm border border-field-500/30">
                          0{i+1}
                        </div>
                        <span className="font-medium tracking-wide">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-charcoal-900 border-b border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col p-6">
              <button 
                onClick={handlePresentationClick}
                className="text-left font-display text-2xl font-bold text-mist-100 hover:text-gold-400 transition-colors py-4 border-b border-white/5"
              >
                Return to Presentation
              </button>

              {modules.map(mod => (
                <div 
                  key={mod.id} 
                  className="py-6 border-b border-white/5 last:border-0 cursor-pointer group"
                  onClick={() => handleModuleClick(mod.id)}
                >
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-mist-400 mb-2">
                    <span className="text-mist-200 block mb-1">Overview:</span> {mod.description}
                  </p>
                  <p className="text-sm text-field-300/80 mb-4 italic">
                    <span className="text-field-300 block mb-1 not-italic">Status:</span> {mod.projectStatus}
                  </p>
                  <ul className="space-y-2">
                    {mod.features.map((feat, i) => (
                      <li key={i} className="text-xs font-mono text-field-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-field-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
