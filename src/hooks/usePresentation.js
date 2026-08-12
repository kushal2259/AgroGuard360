import { useCallback, useState } from 'react'

export function usePresentation(totalSlides) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const goNext = useCallback(() => {
    setIndex((current) => {
      if (current >= totalSlides - 1) return current
      setDirection(1)
      return current + 1
    })
  }, [totalSlides])

  const goPrev = useCallback(() => {
    setIndex((current) => {
      if (current <= 0) return current
      setDirection(-1)
      return current - 1
    })
  }, [])

  const goTo = useCallback((target) => {
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(totalSlides - 1, target))
      if (clamped === current) return current
      setDirection(clamped > current ? 1 : -1)
      return clamped
    })
  }, [totalSlides])

  const restart = useCallback(() => {
    setDirection(-1)
    setIndex(0)
  }, [])

  const openDemo = useCallback(() => setIsDemoOpen(true), [])
  const closeDemo = useCallback(() => setIsDemoOpen(false), [])

  return {
    index,
    direction,
    total: totalSlides,
    goNext,
    goPrev,
    goTo,
    restart,
    isDemoOpen,
    openDemo,
    closeDemo,
  }
}
