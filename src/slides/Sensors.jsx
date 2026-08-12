import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell.jsx'
import FarmScene, { TOPDOWN_FIELD } from '../components/scene/FarmScene.jsx'
import ScanPulse from '../components/scene/ScanPulse.jsx'
import MetricCard from '../components/hud/MetricCard.jsx'
import StatusBadge from '../components/hud/StatusBadge.jsx'

const f = TOPDOWN_FIELD
const HUB = { x: f.x + f.width * 0.5, y: f.y + 40 }
const SENSORS = [
  { id: 's1', x: f.x + f.width * 0.18, y: f.y + f.height * 0.35 },
  { id: 's2', x: f.x + f.width * 0.35, y: f.y + f.height * 0.7 },
  { id: 's3', x: f.x + f.width * 0.62, y: f.y + f.height * 0.28 },
  { id: 's4', x: f.x + f.width * 0.55, y: f.y + f.height * 0.75 },
  { id: 's5', x: f.x + f.width * 0.85, y: f.y + f.height * 0.45 },
]

export default function Sensors() {
  const [readings, setReadings] = useState({ moisture: 41, temp: 28.4, humidity: 63 })

  useEffect(() => {
    const id = setInterval(() => {
      setReadings((r) => ({
        moisture: Math.max(30, Math.min(55, r.moisture + (Math.random() - 0.5) * 2)),
        temp: Math.max(24, Math.min(32, r.temp + (Math.random() - 0.5) * 0.6)),
        humidity: Math.max(50, Math.min(75, r.humidity + (Math.random() - 0.5) * 3)),
      }))
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <SlideShell
      kicker="Phase 04 · Ground Truth"
      title="🌱 SMART SENSORS"
      subtitle="A distributed sensor network feeds real-time soil and climate data straight to the AI core."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15">
          <FarmScene variant="topdown" className="h-full w-full">
            {SENSORS.map((s) => (
              <motion.line
                key={s.id}
                x1={s.x}
                y1={s.y}
                x2={HUB.x}
                y2={HUB.y}
                stroke="#5fb87e"
                strokeWidth={1}
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            ))}
            {SENSORS.map((s, i) => (
              <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
                <circle r={4} fill="#a4d9b6" />
                <ScanPulse size={40} color="#a4d9b6" rings={1} duration={2 + (i % 3) * 0.4} className="-translate-x-1/2 -translate-y-1/2" />
              </g>
            ))}
            <g transform={`translate(${HUB.x} ${HUB.y})`}>
              <circle r={9} fill="#0c0f0e" stroke="#e8b955" strokeWidth={1.5} />
              <circle r={3} fill="#e8b955" className="animate-pulse-slow" />
            </g>
          </FarmScene>
          <div className="pointer-events-none absolute left-4 top-4">
            <StatusBadge variant="active" pulse>
              Network Online · 5 Nodes
            </StatusBadge>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Soil Moisture" value={readings.moisture.toFixed(0)} unit="%" accent="field" />
            <MetricCard label="Temperature" value={readings.temp.toFixed(1)} unit="°C" accent="gold" />
            <MetricCard label="Humidity" value={readings.humidity.toFixed(0)} unit="%" />
            <MetricCard label="Soil Condition" value="Good" accent="field" />
          </div>
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4 text-xs leading-relaxed text-mist-300">
            Every node streams to the central hub continuously — moisture, temperature and humidity are fused with
            aerial and ground imagery before a recommendation is ever generated.
          </div>
          <div className="mt-auto">
            <StatusBadge variant="neutral">Simulated sensor telemetry</StatusBadge>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
