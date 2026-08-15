import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Info, Settings, Activity } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'features' | 'status'
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

  const renderContent = (mod) => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
            <h3 className="font-display text-3xl text-white mb-6">Module Overview</h3>
            <p className="text-xl text-mist-300 leading-relaxed font-light">{mod.description}</p>
          </motion.div>
        )
      case 'features':
        return (
          <motion.div key="features" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
            <h3 className="font-display text-3xl text-white mb-6">Core Capabilities</h3>
            <ul className="space-y-4">
              {mod.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-4 text-white text-lg">
                  <div className="w-8 h-8 rounded-full bg-field-500/20 flex items-center justify-center text-field-400 font-mono text-sm border border-field-500/30">
                    0{i+1}
                  </div>
                  <span className="font-medium tracking-wide">{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )
      case 'status':
        return (
          <motion.div key="status" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
            <h3 className="font-display text-3xl text-white mb-6">Project Status</h3>
            <div className="bg-charcoal-900/50 border border-field-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-field-400" />
              <p className="text-xl text-field-100 leading-relaxed font-light">{mod.projectStatus}</p>
            </div>
          </motion.div>
        )
      default:
        return null
    }
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

      {/* Desktop Mega Menu Panel */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            className="hidden xl:block absolute top-full left-0 w-full bg-charcoal-950/95 backdrop-blur-3xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {modules.map(mod => mod.id === activeMenu && (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="max-w-[1400px] mx-auto px-8 py-10"
              >
                <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                  <h2 className="font-display text-4xl font-medium text-white tracking-tight">
                    {mod.title.split(' — ')[0]} <span className="text-gold-400">— {mod.title.split(' — ')[1]}</span>
                  </h2>
                  <button 
                    onClick={() => handleModuleClick(mod.id)}
                    className="group flex items-center gap-2 text-mist-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all"
                  >
                    Go to Full Module Slide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-[300px_1fr] gap-12 items-start min-h-[250px]">
                  
                  {/* The Clickable Menu INSIDE the Mega Menu */}
                  <div className="flex flex-col gap-2 border-r border-white/5 pr-8 h-full">
                    
                    <button 
                      onMouseEnter={() => setActiveTab('overview')}
                      onClick={() => setActiveTab('overview')}
                      className={`flex flex-col items-start text-left p-4 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
                    >
                      <div className={`flex items-center gap-3 font-mono text-sm uppercase tracking-widest mb-1 ${activeTab === 'overview' ? 'text-gold-400' : 'text-mist-200'}`}>
                        <Info size={16} /> Overview
                      </div>
                      <span className="text-xs text-mist-500">General description</span>
                    </button>

                    <button 
                      onMouseEnter={() => setActiveTab('features')}
                      onClick={() => setActiveTab('features')}
                      className={`flex flex-col items-start text-left p-4 rounded-xl transition-all ${activeTab === 'features' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
                    >
                      <div className={`flex items-center gap-3 font-mono text-sm uppercase tracking-widest mb-1 ${activeTab === 'features' ? 'text-gold-400' : 'text-mist-200'}`}>
                        <Settings size={16} /> Capabilities
                      </div>
                      <span className="text-xs text-mist-500">Technical features</span>
                    </button>

                    <button 
                      onMouseEnter={() => setActiveTab('status')}
                      onClick={() => setActiveTab('status')}
                      className={`flex flex-col items-start text-left p-4 rounded-xl transition-all ${activeTab === 'status' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
                    >
                      <div className={`flex items-center gap-3 font-mono text-sm uppercase tracking-widest mb-1 ${activeTab === 'status' ? 'text-gold-400' : 'text-mist-200'}`}>
                        <Activity size={16} /> What We Are Doing
                      </div>
                      <span className="text-xs text-mist-500">Project engineering status</span>
                    </button>

                  </div>

                  {/* Content Area that changes based on menu selection */}
                  <div className="pt-4">
                    <AnimatePresence mode="wait">
                      {renderContent(mod)}
                    </AnimatePresence>
                  </div>

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
                  className="py-6 border-b border-white/5 last:border-0 group"
                >
                  <h3 
                    className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors cursor-pointer flex items-center justify-between"
                    onClick={() => handleModuleClick(mod.id)}
                  >
                    {mod.title}
                    <ArrowRight size={18} className="text-mist-500" />
                  </h3>
                  <p className="text-sm text-mist-400 mb-2">
                    <span className="text-mist-200 block mb-1">Overview:</span> {mod.description}
                  </p>
                  <p className="text-sm text-field-300/80 mb-4 italic">
                    <span className="text-field-300 block mb-1 not-italic">Status:</span> {mod.projectStatus}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
