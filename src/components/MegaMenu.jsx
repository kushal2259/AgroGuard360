import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Cpu, Compass, Plane, Bot, BarChart3, Droplet } from 'lucide-react'
import { slides } from '../data/slides.js'

const modules = [
  {
    id: 'buddhi',
    title: 'BUDDHI — AI Crop Doctor',
    shortName: 'Buddhi',
    description: 'YOLOv8n object detection classifies crop health, early/late blight, leaf mold, and water stress.',
    icon: <Cpu className="text-gold-400" size={32} />,
    points: [
      { id: 'ai-model', label: 'AI YOLOv8n Model', desc: 'Neural core running edge object detection' },
      { id: 'priority-engine', label: 'Priority Decision Engine', desc: 'Multi-factor scheduling algorithms' },
      { id: 'dataset-pipeline', label: 'Training Dataset Pipeline', desc: 'Image augmentations and validation metrics' }
    ]
  },
  {
    id: 'pegasus',
    title: 'PEGASUS — Farm Monitoring',
    shortName: 'Pegasus',
    description: 'Pixhawk-guided drone surveying crop fields at 15m altitude to capture sub-centimeter GSD frames.',
    icon: <Plane className="text-sky-400" size={32} />,
    points: [
      { id: 'drone-hardware', label: 'Quadcopter & Propulsion', desc: 'Grid survey flight frame specifications' },
      { id: 'comm-system', label: 'Dual-Band Comm System', desc: 'MAVLink telemetry and frame payload links' },
      { id: 'grid-localization', label: 'Image-to-Grid Localization', desc: 'Georeferencing coordinates projection math' }
    ]
  },
  {
    id: 'talos',
    title: 'TALOS — Agricultural Robot',
    shortName: 'Talos',
    description: 'Arduino-driven 4WD ground rover inspecting localized stress zones and applying targeted irrigation.',
    icon: <Bot className="text-field-400" size={32} />,
    points: [
      { id: 'robot-hardware', label: 'Differential Rover Specs', desc: 'Differential drive frame & microcontroller control' },
      { id: 'sonar-ranger', label: 'Obstacle Avoidance Sonar', desc: 'Time-of-flight obstacle distance calculation formulas' },
      { id: 'moisture-monitoring', label: 'Moisture Loop Calibration', desc: 'Capacitive sensors & IRF520 MOSFET pump loop' }
    ]
  },
  {
    id: 'promethia',
    title: 'PROMETHIA — Route Optimizer',
    shortName: 'Promethia',
    description: 'Generates cost-minimized routes across a farm grid using A* pathfinding.',
    icon: <Compass className="text-emerald-400" size={32} />,
    points: [
      { id: 'pathfinding-astar', label: 'A* Pathfinding & Heuristics', desc: 'Lanes routing using Manhattan Distance calculations' },
      { id: 'cost-grid-rerouting', label: 'Dynamic Grid Cost Weights', desc: 'Terrain costing & 15ms dynamic sonar re-routing' }
    ]
  },
  {
    id: 'mercatus',
    title: 'MERCATUS — Financial Analytics',
    shortName: 'Mercatus',
    description: 'Computes Capex amortization, water/labor savings, and Net Benefit metrics to audit system ROI.',
    icon: <BarChart3 className="text-amber-400" size={32} />,
    points: [
      { id: 'feasibility-audit', label: 'Economic Feasibility Audit', desc: 'Capital expenditure cost-benefit audit analysis' },
      { id: 'roi-math', label: 'ROI & Cost Formulas', desc: 'Operational savings equations & dashboard calculations' }
    ]
  },
  {
    id: 'sensors',
    title: 'SENSORS — IoT & Smart Irrigation',
    shortName: 'Sensors',
    description: 'Continuous soil telemetry network and closed-loop drip irrigation automation systems.',
    icon: <Droplet className="text-sky-400" size={32} />,
    points: [
      { id: 'iot-sensors', label: 'IoT Sensor Network', desc: 'Soil moisture, temp, humidity, and light probes' },
      { id: 'smart-irrigation', label: 'Smart Irrigation', desc: 'Automated micro-drip pump and valve controllers' }
    ]
  }
]

export default function MegaMenu({ onGoTo, onOpenDetailPage }) {
  const [activeMenu, setActiveMenu] = useState(null)
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
              onMouseEnter={() => setActiveMenu(mod.id)}
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
                transition={{ delay: 0.05, duration: 0.2 }}
                className="max-w-[1400px] mx-auto px-8 py-10 grid grid-cols-[380px_1fr] gap-12 items-start"
              >
                
                {/* Left Side: Module Intro Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col h-full min-h-[300px]">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    {mod.icon}
                  </div>
                  <h2 className="font-display text-3xl font-medium text-white tracking-tight mb-4">
                    {mod.title.split(' — ')[0]}
                    <span className="block text-sm text-gold-400 font-mono tracking-widest mt-1">
                      {mod.title.split(' — ')[1]}
                    </span>
                  </h2>
                  <p className="text-sm leading-relaxed text-mist-300 mb-8 font-light">
                    {mod.description}
                  </p>
                  <button 
                    onClick={() => handleModuleClick(mod.id)}
                    className="group mt-auto flex items-center gap-2 text-mist-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all"
                  >
                    Go to Full Module Slide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Right Side: Clickable Sub-points Grid */}
                <div className="flex flex-col h-full pt-2">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-field-500 mb-6">Detailed Specifications</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {mod.points.map(point => (
                      <button
                        key={point.id}
                        onClick={() => {
                          setActiveMenu(null)
                          if (onOpenDetailPage) {
                            onOpenDetailPage(mod.id, point.id)
                          }
                        }}
                        className="group flex flex-col items-start text-left p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all shadow-lg hover:shadow-black/40 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <span className="font-display text-lg font-medium text-white group-hover:text-gold-400 transition-colors">
                            {point.label}
                          </span>
                          <ArrowRight size={16} className="text-mist-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                        <span className="text-xs text-mist-400 font-light leading-relaxed">
                          {point.desc}
                        </span>
                      </button>
                    ))}
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
                  <p className="text-sm text-mist-400 mb-4">
                    {mod.description}
                  </p>
                  
                  {/* Mobile points list */}
                  <div className="flex flex-col gap-2">
                    {mod.points.map(point => (
                      <button
                        key={point.id}
                        onClick={() => {
                          setMobileMenuOpen(false)
                          if (onOpenDetailPage) {
                            onOpenDetailPage(mod.id, point.id)
                          }
                        }}
                        className="flex items-center justify-between w-full p-3 bg-white/5 rounded-xl text-left hover:bg-white/10"
                      >
                        <span className="text-sm text-mist-200">{point.label}</span>
                        <ArrowRight size={14} className="text-mist-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
