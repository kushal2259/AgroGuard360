import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crosshair, Activity, Cpu, ShieldAlert, Terminal, ChevronRight, Zap } from 'lucide-react'

// Random data stream component for the HUD effect
function DataStream() {
  const [data, setData] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = Array.from({ length: 8 }).map(() => (
        Math.random().toString(36).substring(2, 10).toUpperCase()
      ))
      setData(newData)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-[9px] leading-tight text-field-500/50 opacity-70 hidden md:block">
      {data.map((str, i) => (
        <div key={i}>{`SYS.${i} > ${str}`}</div>
      ))}
    </div>
  )
}

function RadarGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center opacity-20 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] rounded-full border border-field-400/20 border-dashed"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full border border-gold-400/20"
      />
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-field-400/30 to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-field-400/30 to-transparent" />
      
      {/* Radar Sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[75vw] h-[75vw] max-w-[600px] max-h-[600px] rounded-full origin-center"
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(95,184,126,0.15) 100%)'
        }}
      />
    </div>
  )
}

function ScanningLaser() {
  return (
    <motion.div
      animate={{ y: ['-10%', '110%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-[2px] bg-field-400 z-50 pointer-events-none opacity-40 shadow-[0_0_20px_rgba(95,184,126,1)]"
    />
  )
}

export default function Cover({ onOpenDemo, onNext }) {
  return (
    <div className="relative h-full w-full bg-[#050606] overflow-hidden text-field-50 selection:bg-field-400/30">
      
      <RadarGrid />
      <ScanningLaser />

      {/* Screen Vignette & CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,#050606_100%)] opacity-80" />
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,22,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

      {/* HUD Corner Brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-field-400/50 z-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-field-400/50 z-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-field-400/50 z-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-field-400/50 z-20" />

      {/* HUD Header Elements */}
      <div className="absolute top-10 left-32 flex items-center gap-4 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-field-400">
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <span className="w-2 h-2 inline-block rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          Live Uplink
        </motion.div>
        <span className="opacity-50">//</span>
        <span>Sec: 99.4A</span>
      </div>

      <div className="absolute top-10 right-32 z-20">
        <DataStream />
      </div>

      {/* Main Content Centered */}
      <div className="relative z-30 flex h-full w-full flex-col items-center justify-center px-4">
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-gold-400" size={24} />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold-400">Project Initialize</span>
            <Zap className="text-gold-400" size={24} />
          </div>

          <h1 className="font-display text-7xl md:text-9xl font-black leading-none tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-mist-100 via-mist-300 to-field-900 drop-shadow-[0_0_30px_rgba(95,184,126,0.3)]">
            AGROGUARD<span className="text-gold-400">360</span>
          </h1>

          <p className="font-mono text-sm md:text-base text-field-300/80 max-w-2xl mb-12 uppercase tracking-widest leading-relaxed">
            [ Next-Gen Autonomous Farming Neural Network ] <br/>
            Sense <span className="mx-2 text-gold-400">|</span> 
            Fly <span className="mx-2 text-gold-400">|</span> 
            Automate <span className="mx-2 text-gold-400">|</span> 
            Optimize
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={onNext}
              className="group relative overflow-hidden bg-field-500/10 border border-field-400/50 px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-field-100 transition-all hover:bg-field-400/20 hover:shadow-[0_0_30px_rgba(95,184,126,0.4)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Cpu size={16} className="text-field-400 group-hover:animate-pulse" /> Execute Core
              </span>
              <div className="absolute inset-0 w-0 bg-field-400/20 transition-all duration-300 ease-out group-hover:w-full" />
            </button>

            <button
              onClick={onOpenDemo}
              className="group flex items-center gap-2 border border-mist-500/30 bg-transparent px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-mist-400 transition-all hover:border-gold-400 hover:text-gold-400 hover:shadow-[0_0_20px_rgba(232,185,85,0.2)]"
            >
              <Terminal size={16} /> Access Terminal
            </button>
          </div>
        </motion.div>

      </div>

      {/* Floating UI Badges */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-16 md:left-32 z-20 flex items-center gap-3 bg-charcoal-900/80 border border-field-400/30 p-4 rounded-lg backdrop-blur-md"
      >
        <Crosshair className="text-field-400 animate-spin-slow" size={24} />
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist-500">Target Acquired</div>
          <div className="font-mono text-xs font-bold text-mist-100">Sector 7G Alpha</div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-16 md:right-32 z-20 flex items-center gap-3 bg-charcoal-900/80 border border-red-500/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]"
      >
        <ShieldAlert className="text-red-400 animate-pulse" size={24} />
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist-500">Threat Detected</div>
          <div className="font-mono text-xs font-bold text-red-400">Pest Infestation 84%</div>
        </div>
      </motion.div>

    </div>
  )
}
