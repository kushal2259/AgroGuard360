import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { slides } from '../data/slides.js'

const modules = [
  {
    id: 'buddhi',
    title: 'BUDDHI — AI Crop Doctor',
    description: 'AI analyzes crop images and detects healthy crop, disease, water stress, and pest damage.',
    features: ['Computer Vision', 'Disease Detection', 'Confidence Scoring']
  },
  {
    id: 'fiontar',
    title: 'FIONTAR — AgroGuard Startup',
    description: 'Turn the technology into a real-world product combining AI, drones, robots, and analytics.',
    features: ['Hardware & Subscription', 'Farm Monitoring', 'Target: Farmers & Greenhouses']
  },
  {
    id: 'talos',
    title: 'TALOS — Agricultural Robot',
    description: 'Autonomous ground robot travels between rows to inspect crops and carry spray mechanisms.',
    features: ['Obstacle Detection', 'Soil Measurement', 'Targeted Treatment']
  },
  {
    id: 'pegasus',
    title: 'PEGASUS — Farm Monitoring Drone',
    description: 'The eyes in the sky flying over the farm capturing crop images for the AI system.',
    features: ['Crop Health Scanning', 'Dry Area Locating', 'Image Transmission']
  },
  {
    id: 'promethia',
    title: 'PROMETHIA — Farm Route Optimizer',
    description: 'Calculates the most efficient route for Talos to visit problem areas detected by Pegasus.',
    features: ['Path Optimization', 'Graph Algorithms', 'Efficiency Maximization']
  },
  {
    id: 'mercatus',
    title: 'MERCATUS — Farm Financial Analytics',
    description: 'Calculates water usage, fertilizer cost, robot/drone cost, crop savings, and ROI.',
    features: ['Economic Value Analysis', 'Cost Comparison', 'ROI Estimation']
  }
]

export default function MegaMenu({ onGoTo }) {
  const [activeMenu, setActiveMenu] = useState(false)

  const handleModuleClick = (modId) => {
    setActiveMenu(false)
    const index = slides.findIndex(s => s.id === modId)
    if (index !== -1 && onGoTo) {
      onGoTo(index)
    }
  }

  const handleLogoClick = () => {
    setActiveMenu(false)
    if (onGoTo) onGoTo(0)
  }

  const handlePresentationClick = () => {
    setActiveMenu(false)
    if (onGoTo) onGoTo(1)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="relative z-50 flex items-center justify-between px-6 md:px-8 py-4 backdrop-blur-md bg-charcoal-950/80 border-b border-field-300/20">
        <div className="font-display text-xl font-bold text-mist-100 cursor-pointer" onClick={handleLogoClick}>
          AGROGUARD <span className="text-gold-400">360</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={handlePresentationClick}
            className="text-mist-300 hover:text-mist-100 font-mono text-sm uppercase tracking-wider transition-colors"
          >
            Presentation
          </button>
          <button 
            className="text-mist-300 hover:text-mist-100 font-mono text-sm uppercase tracking-wider transition-colors"
            onMouseEnter={() => setActiveMenu(true)}
            onClick={() => setActiveMenu(!activeMenu)}
          >
            Modules & Technology
          </button>
        </nav>

        <button 
          className="md:hidden text-mist-300 hover:text-mist-100 transition-colors"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {activeMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-charcoal-900 border-b border-field-300/20 shadow-2xl max-h-[85vh] overflow-y-auto"
            onMouseLeave={() => setActiveMenu(false)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-6 md:p-8 max-w-7xl mx-auto">
              {/* Mobile-only presentation link */}
              <div className="sm:hidden col-span-1 border-b border-field-300/10 pb-4 mb-2">
                <button 
                  onClick={handlePresentationClick}
                  className="w-full text-left font-display text-lg font-bold text-mist-100 hover:text-gold-400 transition-colors"
                >
                  Return to Presentation →
                </button>
              </div>

              {modules.map(mod => (
                <div 
                  key={mod.id} 
                  className="group cursor-pointer p-3 md:p-4 -mx-3 md:-m-4 rounded-xl hover:bg-charcoal-800 transition-colors"
                  onClick={() => handleModuleClick(mod.id)}
                >
                  <h3 className="font-display text-lg font-bold text-mist-100 mb-2 group-hover:text-gold-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-mist-400 mb-3 line-clamp-3">
                    {mod.description}
                  </p>
                  <ul className="space-y-1">
                    {mod.features.map((feat, i) => (
                      <li key={i} className="text-xs font-mono text-field-300 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-field-400" />
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
