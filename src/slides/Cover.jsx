import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Eye, BarChart3, Navigation } from 'lucide-react'

function MatrixBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    let resizeTimer
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 100)
    }
    window.addEventListener('resize', handleResize)

    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('')
    const fontSize = 16
    let columns = Math.ceil(window.innerWidth / fontSize)
    let drops = Array.from({ length: columns }).map(() => Math.random() * -100)

    let animationId
    let lastDrawTime = 0
    const fps = 25
    const frameInterval = 1000 / fps

    const draw = (currentTime) => {
      animationId = requestAnimationFrame(draw)
      
      const deltaTime = currentTime - lastDrawTime
      if (deltaTime < frameInterval) return
      
      lastDrawTime = currentTime - (deltaTime % frameInterval)

      // Dynamic column adjustment if resized
      const currentCols = Math.ceil(canvas.width / fontSize)
      if (currentCols > drops.length) {
        drops = drops.concat(Array.from({ length: currentCols - drops.length }).map(() => Math.random() * -50))
      }

      // Fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        
        // 10% chance for gold, 90% for green
        const isGold = Math.random() > 0.9
        // 5% chance for bright white leader
        const isLeader = Math.random() > 0.95

        ctx.fillStyle = isLeader ? '#ffffff' : isGold ? '#e8b955' : '#5fb87e'

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }
    
    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] pointer-events-none" />
    </div>
  )
}

function GlassCard({ children, delay, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

function FeaturePill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
      <Icon size={16} className="text-field-300" />
      <span className="font-mono text-xs text-white uppercase tracking-wider">{label}</span>
    </div>
  )
}

export default function Cover({ onOpenDemo, onNext }) {
  return (
    <div className="relative h-full w-full bg-[#050606] overflow-hidden text-white selection:bg-field-500/30">
      <MatrixBackground />

      {/* Grid Overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 md:px-16 pt-20 max-w-[1600px] mx-auto">
        
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-center h-full">
          
          {/* Left Column: Hero Typography */}
          <div className="flex flex-col items-start justify-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-field-400 animate-pulse shadow-[0_0_10px_rgba(95,184,126,1)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-white">System V4 Online</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[7.5rem] font-medium leading-[0.95] tracking-tight mb-8"
            >
              The Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-field-300 via-gold-200 to-white">
                Farming.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-white/60 font-light max-w-xl leading-relaxed mb-12"
            >
              AGROGUARD 360 combines autonomous drones, ground robotics, and neural networks to revolutionize crop management.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onNext}
                className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 hover:bg-field-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Explore Platform <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onOpenDemo}
                className="group flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40"
              >
                View Live Demo
              </button>
            </motion.div>

          </div>

          {/* Right Column: Holographic Glass UI */}
          <div className="hidden lg:flex flex-col gap-6 w-full relative">
            
            {/* Main Premium Card */}
            <GlassCard delay={0.4} className="p-10 relative group hover:border-white/30 transition-colors cursor-pointer" onClick={onNext}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-field-400 to-field-600 flex items-center justify-center shadow-[0_0_20px_rgba(95,184,126,0.4)]">
                  <Cpu size={24} className="text-white" />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-white/50 border border-white/10 px-3 py-1 rounded-full">
                  Active Sync
                </div>
              </div>
              <h3 className="font-display text-4xl font-medium text-white mb-2 relative z-10">Neural Core</h3>
              <p className="text-white/60 relative z-10">Processing 14.2 TB of crop imaging data in real-time.</p>
            </GlassCard>

            {/* Grid of smaller feature pills */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <FeaturePill icon={Eye} label="Computer Vision" />
              <FeaturePill icon={Navigation} label="Path Optimization" />
              <FeaturePill icon={BarChart3} label="Yield Analytics" />
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  )
}
