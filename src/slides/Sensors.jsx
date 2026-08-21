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
      kicker="Phase 07 · IoT & Irrigation"
      title="💧 SENSORS & SMART IRRIGATION"
      subtitle="Distributed IoT telemetry feeds automated micro-irrigation pump loops."
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
        <div className="relative overflow-hidden rounded-md border border-mist-500/15">
          <FarmScene variant="topdown" className="h-full w-full">
            {SENSORS.map((s) => (
              <motion.line
                key={s.id}
                x1={s.x}
                y1={s.y}
                x2={HUB.x}
                y2={HUB.y}
                stroke="#38bdf8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            ))}
            {SENSORS.map((s, i) => (
              <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
                <circle r={5} fill="#38bdf8" />
                <ScanPulse size={36} color="#38bdf8" rings={1} duration={2.2 + (i % 3) * 0.3} className="-translate-x-1/2 -translate-y-1/2" />
                <g transform="translate(8 -10)">
                  <text className="font-mono text-[9px] fill-sky-300 font-bold">S0{i+1}</text>
                </g>
              </g>
            ))}
            <g transform={`translate(${HUB.x} ${HUB.y})`}>
              <circle r={10} fill="#0c0f0e" stroke="#38bdf8" strokeWidth={1.5} />
              <circle r={3} fill="#38bdf8" className="animate-pulse" />
              <g transform="translate(12 -2)">
                <text className="font-mono text-[8px] fill-mist-400">IRRIGATION HUB</text>
              </g>
            </g>
          </FarmScene>
          <div className="pointer-events-none absolute left-4 top-4">
            <StatusBadge variant="active" pulse>
              Pumps Online · Auto Mode
            </StatusBadge>
          </div>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none pr-1">
          <div className="grid grid-cols-2 gap-3 rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4">
            <MetricCard label="Soil Moisture" value="28" unit="%" accent="danger" />
            <MetricCard label="Water Level" value="74" unit="%" accent="field" />
            <MetricCard label="Air Temp" value="31.2" unit="°C" accent="gold" />
            <MetricCard label="Air Humidity" value="58" unit="%" />
          </div>
          
          <div className="rounded-md border border-mist-500/15 bg-charcoal-900/60 p-4 space-y-4 text-xs">
            
            {/* IoT Sensors Network */}
            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-sky-400 border-b border-white/5 pb-1 mb-2">📡 IoT Sensor Network</h5>
              <p className="text-mist-300 leading-relaxed mb-2 font-light">
                Continuous monitoring of: Volumetric soil moisture, temp, humidity, light intensity, and water tank levels.
              </p>
              <div className="font-mono text-[10px] text-white bg-charcoal-950/50 p-2 rounded border border-white/5">
                <span className="text-red-400 font-bold">SENSOR S01 (Active)</span><br />
                Moisture: 28% | Temp: 31°C | Hum: 58%<br />
                <span className="text-red-400 animate-pulse font-bold block mt-1">⚠ STATE: LOW MOISTURE</span>
              </div>
            </div>

            {/* Smart Irrigation */}
            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-field-400 border-b border-white/5 pb-1 mb-2">💧 Smart Irrigation Hardware</h5>
              <ul className="space-y-1 list-disc ml-4 text-mist-300 font-light">
                <li>Main pressurized water tank & pump system.</li>
                <li>Primary + secondary distribution pipelines.</li>
                <li>Zone solenoids & localized drip lines.</li>
              </ul>
            </div>

            {/* Automation flow */}
            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-gold-400 border-b border-white/5 pb-1 mb-2">⚙️ Closed-Loop Automation</h5>
              <div className="font-mono text-[9px] text-mist-400 bg-charcoal-950/50 p-2.5 rounded border border-white/5 leading-relaxed space-y-1">
                <div>1. Soil probe detects moisture &lt; 28%</div>
                <div>2. Sends signal to BUDDHI AI Engine</div>
                <div>3. BUDDHI activates specific Zone Valve</div>
                <div>4. Submersible pump triggers ON</div>
                <div>5. Water flows to designated zone</div>
                <div>6. Moisture increases &gt; 68% ➔ Pump OFF</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SlideShell>
  )
}
