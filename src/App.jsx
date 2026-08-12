import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePresentation } from './hooks/usePresentation.js'
import { slides } from './data/slides.js'
import Navigation from './components/Navigation.jsx'
import LiveDemo from './components/LiveDemo.jsx'
import MegaMenu from './components/MegaMenu.jsx'

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 56 : -56,
    scale: 0.98,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -56 : 56,
    scale: 0.98,
    filter: 'blur(6px)',
  }),
}

export default function App() {
  const {
    index,
    direction,
    total,
    goNext,
    goPrev,
    goTo,
    restart,
    isDemoOpen,
    openDemo,
    closeDemo,
  } = usePresentation(slides.length)

  useEffect(() => {
    const handleKey = (event) => {
      if (isDemoOpen) {
        if (event.key === 'Escape') closeDemo()
        return
      }
      if (event.key === 'ArrowRight' || event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isDemoOpen, goNext, goPrev, closeDemo])

  const ActiveSlide = slides[index].Component

  return (
    <div className="relative h-screen w-full overflow-hidden bg-charcoal-950 text-mist-100">
      <MegaMenu onGoTo={goTo} />

      <div className="absolute inset-0 pt-[72px]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={slides[index].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ActiveSlide onOpenDemo={openDemo} onRestart={restart} onNext={goNext} />
          </motion.div>
        </AnimatePresence>
      </div>

      {!isDemoOpen && index !== 0 && (
        <Navigation
          index={index}
          total={total}
          titles={slides.map((s) => s.title)}
          onNext={goNext}
          onPrev={goPrev}
          onGoTo={goTo}
        />
      )}

      <AnimatePresence>{isDemoOpen && <LiveDemo onClose={closeDemo} />}</AnimatePresence>
    </div>
  )
}
