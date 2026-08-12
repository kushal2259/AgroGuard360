import { useEffect, useRef } from 'react'

/**
 * Subscribes a callback to requestAnimationFrame, passing (dt, elapsed).
 * dt is clamped so tab-switches / lag spikes don't teleport animated objects.
 */
export function useLoopFrame(callback, isActive = true) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!isActive) return undefined

    let frameId
    let lastTime = performance.now()
    let elapsed = 0

    const tick = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      elapsed += dt
      callbackRef.current(dt, elapsed)
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isActive])
}
