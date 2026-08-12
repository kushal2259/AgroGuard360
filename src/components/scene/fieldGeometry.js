// Shared perspective-projection geometry for the "hero" (elevated cinematic) farm
// scene. All hero-variant scene pieces (crop rows, drone path, robot waypoints)
// share this so everything converges to the same vanishing point consistently.

export const VIEWBOX_W = 1600
export const VIEWBOX_H = 900

export const VP = { x: 800, y: 300 } // vanishing point near the horizon
export const FIELD_TOP_Y = 358 // where the crop field visually meets the horizon
export const FIELD_BOTTOM_Y = 900 // full-bleed to the bottom edge
export const FIELD_LEFT_BOTTOM = -120
export const FIELD_RIGHT_BOTTOM = 1720

export const lerp = (a, b, t) => a + (b - a) * t

/**
 * Projects a point defined by its x-position at the near (bottom) edge of the
 * field, and a depth fraction (0 = nearest camera, 1 = at the horizon), into
 * scene coordinates. Straight-line interpolation toward the vanishing point
 * reproduces correct perspective convergence for any given depth fraction.
 */
export function projectHero(xBottom, depthT) {
  const t = Math.max(0, Math.min(1, depthT))
  const x = lerp(xBottom, VP.x, t)
  const y = lerp(FIELD_BOTTOM_Y, FIELD_TOP_Y, t)
  const scale = lerp(1, 0.32, t)
  return { x, y, scale }
}

// Eases a linear 0..1 sample toward the horizon so near-camera rows read
// wider/taller (foreshortening) than distant ones.
export const depthEase = (t) => Math.pow(t, 1.7)

export const TOPDOWN_FIELD = { x: 150, y: 130, width: 1300, height: 640 }
