import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      const isClickable = e.target.closest('button, a, input, select, [role="button"], .cursor-pointer')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => setIsVisible(false))
    document.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Outer glowing ring with spring physics */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-gold-400/50 pointer-events-none z-[100] mix-blend-screen shadow-[0_0_15px_rgba(232,185,85,0.4)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? 'rgba(95, 184, 126, 0.8)' : 'rgba(232, 185, 85, 0.5)',
          boxShadow: isHovering ? '0 0 20px rgba(95, 184, 126, 0.6)' : '0 0 15px rgba(232, 185, 85, 0.4)'
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner sharp dot follows exactly */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-field-300 pointer-events-none z-[100] shadow-[0_0_8px_rgba(95,184,126,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
