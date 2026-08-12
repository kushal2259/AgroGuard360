import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

// Creates slow-moving, glowing ambient particles in the background
function AmbientParticles() {
  const particles = Array.from({ length: 30 })
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: 0, 
            opacity: 0,
            x: 0
          }}
          animate={{
            y: Math.random() * -200 - 50,
            opacity: [0, Math.random() * 0.4 + 0.1, 0],
            x: Math.random() * 100 - 50
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            backgroundColor: i % 3 === 0 ? '#e8b955' : '#5fb87e',
            boxShadow: `0 0 15px ${i % 3 === 0 ? '#e8b955' : '#5fb87e'}`
          }}
        />
      ))}
    </div>
  )
}

export default function Cover({ onNext }) {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  // Use a spring to make the spotlight movement buttery smooth and slightly trailing the cursor
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // The massive typography component rendered twice (once for outline, once for image mask)
  const TitleText = () => (
    <div className="flex flex-col items-center text-center font-display leading-[0.85] tracking-tighter w-full uppercase">
      <div className="text-[15vw] font-black w-full text-center">AGROGUARD</div>
      <div className="text-[15vw] font-black w-full text-center text-gold-400">360</div>
    </div>
  )

  return (
    <div 
      className="relative h-full w-full bg-[#020202] overflow-hidden cursor-none flex flex-col items-center justify-center group"
      onClick={onNext}
    >
      <AmbientParticles />

      {/* LAYER 1: THE OUTLINE TEXT (Always visible) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ 
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.08)',
          color: 'transparent'
        }}
      >
        <TitleText />
      </div>

      {/* LAYER 2: THE REVEAL TEXT (Visible only inside spotlight) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        style={{
          backgroundImage: "url('/farm_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          clipPath: useMotionTemplate`circle(25vw at ${smoothX}px ${smoothY}px)`
        }}
      >
        <TitleText />
      </motion.div>

      {/* LAYER 3: SUBTITLE & CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none z-30">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mb-8 font-mono text-sm md:text-base text-field-200/60 uppercase tracking-[0.4em] text-center max-w-lg px-6"
        >
          Sense <span className="mx-2 text-gold-400/50">|</span> 
          Fly <span className="mx-2 text-gold-400/50">|</span> 
          Automate <span className="mx-2 text-gold-400/50">|</span> 
          Optimize
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-mist-400/80 bg-charcoal-900/50 backdrop-blur-md px-6 py-3 rounded-full border border-mist-500/10 group-hover:border-gold-400/30 group-hover:text-gold-300 transition-colors"
        >
          Click anywhere to initialize <ChevronRight size={14} className="animate-pulse text-gold-400" />
        </motion.div>

      </div>
    </div>
  )
}
