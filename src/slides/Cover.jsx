import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Radio, ChevronRight, Activity, Crosshair, Cpu, Eye, Wifi } from 'lucide-react'
import FarmScene from '../components/scene/FarmScene.jsx'
import Drone from '../components/scene/Drone.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'

function FuturisticGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-30">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,184,126,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(95,184,126,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
    </div>
  )
}

function TechCard({ icon: Icon, label, value, delay = 0, color = 'field' }) {
  const colorMap = {
    field: 'text-field-300 shadow-[0_0_15px_rgba(95,184,126,0.2)]',
    gold: 'text-gold-300 shadow-[0_0_15px_rgba(232,185,85,0.2)]',
    danger: 'text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-4 bg-charcoal-900/40 backdrop-blur-md border border-mist-500/20 rounded-xl p-4 cursor-pointer hover:bg-charcoal-800/50 hover:border-mist-500/40 transition-all group ${colorMap[color]}`}
    >
      <div className="p-3 bg-charcoal-950/80 rounded-lg group-hover:scale-110 transition-transform">
        <Icon size={20} className={color === 'gold' ? 'text-gold-400' : color === 'danger' ? 'text-red-400' : 'text-field-400'} />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500 mb-1">{label}</div>
        <div className="font-display font-bold text-mist-100">{value}</div>
      </div>
    </motion.div>
  )
}

export default function Cover({ onOpenDemo, onNext }) {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Split text for staggered reveal
  const titleText = "AGROGUARD 360".split("")

  return (
    <div className="relative h-full w-full bg-charcoal-950 overflow-hidden">
      {/* Background Layer with Drones */}
      <div className="absolute inset-0 opacity-40 scale-105">
        <FarmScene variant="hero" className="h-full w-full">
          <Drone timeOffset={0} depthOffset={-0.34} xOffset={200} baseScale={1.8} />
          <Drone timeOffset={15} depthOffset={0.55} xOffset={-500} baseScale={0.8} />
          <Drone timeOffset={35} depthOffset={0.5} xOffset={450} baseScale={1.1} />
        </FarmScene>
      </div>

      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-charcoal-950/60" />

      {/* Futuristic Grid */}
      <FuturisticGrid />

      {/* Dynamic Spotlight following mouse */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-screen"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(95, 184, 126, 0.15), transparent 80%)`
          )
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 md:px-16 pt-20">
        
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center h-full">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="flex flex-col items-start justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <StatusBadge variant="active" pulse>
                <div className="flex items-center gap-2">
                  <Wifi size={12} className="animate-pulse" />
                  System Online
                </div>
              </StatusBadge>
              <StatusBadge variant="neutral">AI Neural Network v4.2</StatusBadge>
            </motion.div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-6 flex flex-wrap">
              {titleText.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={char === "3" || char === "6" || char === "0" ? "text-gold-400 text-glow-gold" : "text-mist-100"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-field-200 font-light max-w-2xl leading-relaxed mb-10"
            >
              Precision Agriculture driven by <span className="text-mist-100 font-semibold">Artificial Intelligence</span>. See the crop, understand the problem, act before it's too late.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-5"
            >
              <button
                type="button"
                onClick={onNext}
                className="group relative overflow-hidden rounded-full bg-field-400/20 border border-field-400/50 backdrop-blur-md px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-field-100 transition-all hover:bg-field-400 hover:text-charcoal-950 hover:shadow-[0_0_30px_rgba(95,184,126,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Initialize Presentation <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="group flex items-center gap-3 rounded-full border border-mist-500/20 bg-charcoal-900/40 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-mist-300 backdrop-blur-md transition-all hover:border-gold-400/50 hover:bg-charcoal-800/80 hover:text-gold-300"
              >
                <Radio size={14} className="group-hover:animate-pulse text-gold-400" /> 
                Live Demo
              </button>
            </motion.div>
          </div>

          {/* Right Column: Floating Glassmorphic Stats */}
          <div className="hidden lg:flex flex-col gap-5 max-w-md ml-auto w-full relative">
            {/* Decorative connection lines */}
            <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-field-400/30 to-transparent" />
            
            <TechCard 
              icon={Crosshair} 
              label="Fleet Status" 
              value="3 Drones Active" 
              delay={1.0}
            />
            <TechCard 
              icon={Eye} 
              label="BUDDHI Engine" 
              value="Scanning 14.2 acres" 
              delay={1.2}
              color="gold"
            />
            <TechCard 
              icon={Cpu} 
              label="TALOS Ground Unit" 
              value="Awaiting coordinates" 
              delay={1.4}
            />
            <TechCard 
              icon={Activity} 
              label="MERCATUS Analytics" 
              value="Live Market Sync" 
              delay={1.6}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
