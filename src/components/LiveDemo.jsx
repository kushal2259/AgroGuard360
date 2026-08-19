import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Play, RefreshCw, Volume2, VolumeX, AlertTriangle, Droplet, Radio, Bot, ShieldCheck, Terminal, HelpCircle, Activity } from 'lucide-react'
import Panel from './hud/Panel.jsx'
import StatusBadge from './hud/StatusBadge.jsx'
import { sound } from '../utils/sound.js'

// Obstacle coordinates
const OBSTACLES = new Set(['1,3', '2,3', '3,3', '4,1', '4,2'])
const GRID_SIZE = 6
const START_ROBOT = { x: 0, y: 5 }
const START_DRONE = { x: 0, y: 0 }

// Simple A* implementation
function calculateAStarPath(start, end) {
  const startKey = `${start.x},${start.y}`
  const openSet = [start]
  const cameFrom = {}
  const gScore = { [startKey]: 0 }
  const fScore = { [startKey]: Math.abs(start.x - end.x) + Math.abs(start.y - end.y) }

  while (openSet.length > 0) {
    openSet.sort((a, b) => {
      const fa = fScore[`${a.x},${a.y}`] ?? Infinity
      const fb = fScore[`${b.x},${b.y}`] ?? Infinity
      return fa - fb
    })
    
    const current = openSet.shift()
    if (current.x === end.x && current.y === end.y) {
      const path = []
      let temp = current
      while (temp) {
        path.push(temp)
        temp = cameFrom[`${temp.x},${temp.y}`]
      }
      return path.reverse()
    }

    const currentKey = `${current.x},${current.y}`
    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 }
    ].filter(n => n.x >= 0 && n.x < GRID_SIZE && n.y >= 0 && n.y < GRID_SIZE && !OBSTACLES.has(`${n.x},${n.y}`))

    for (const n of neighbors) {
      const nKey = `${n.x},${n.y}`
      const tentativeG = gScore[currentKey] + 1
      if (tentativeG < (gScore[nKey] ?? Infinity)) {
        cameFrom[nKey] = current
        gScore[nKey] = tentativeG
        fScore[nKey] = tentativeG + Math.abs(n.x - end.x) + Math.abs(n.y - end.y)
        if (!openSet.some(o => o.x === n.x && o.y === n.y)) {
          openSet.push(n)
        }
      }
    }
  }
  return [] // No path found
}

export default function LiveDemo({ onClose }) {
  const [selectedCell, setSelectedCell] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | scanning | detecting | routing | dispatching | inspecting | success
  const [robotPos, setRobotPos] = useState(START_ROBOT)
  const [dronePos, setDronePos] = useState(START_DRONE)
  const [path, setPath] = useState([])
  const [logs, setLogs] = useState([
    'SYSTEM INITIALIZED: Awaiting coordinate targeting input...',
    'Base stations online. SiK telemetry sync: 100%'
  ])
  const [muted, setMuted] = useState(false)
  const [moisture, setMoisture] = useState(650)
  const [sonarDist, setSonarDist] = useState(100)
  const [waterLevel, setWaterLevel] = useState(100)
  const [savings, setSavings] = useState(0)

  const logEndRef = useRef(null)

  const addLog = (text) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`])
  }

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Toggle sounds
  const toggleMuted = () => {
    setMuted(!muted)
    sound.setMuted(!muted)
    sound.playClick()
  }

  // Handle grid clicks to target cell
  const handleCellClick = (x, y) => {
    if (phase !== 'idle' && phase !== 'success') return
    if (OBSTACLES.has(`${x},${y}`) || (x === START_ROBOT.x && y === START_ROBOT.y)) return

    sound.playClick()
    setSelectedCell({ x, y })
    setPhase('idle')
    setRobotPos(START_ROBOT)
    setDronePos(START_DRONE)
    setPath([])
    setMoisture(650)
    setSonarDist(100)
    addLog(`Target node set to: Grid coordinates (${x}, ${y}).`)
  }

  // Begin mission control loop
  const startMission = async () => {
    if (!selectedCell) return
    setPhase('scanning')
    addLog('Executing PEGASUS Drone Survey dispatch...')
    
    // Simulate Drone Scanning
    sound.playScan()
    await delay(1500)
    setDronePos(selectedCell)
    addLog(`PEGASUS arrived at target (${selectedCell.x}, ${selectedCell.y}). Capturing crop frame payload...`)
    
    // Frame transfer & AI detection
    sound.playScan()
    await delay(1200)
    setPhase('detecting')
    addLog('MAVLink raw payload transferred successfully.')
    addLog('BUDDHI AI model processing (YOLOv8n CPU forward-pass)...')
    
    await delay(1500)
    sound.playAlert()
    const problems = ['Late Blight (Fungal)', 'Early Blight', 'Severe Water Stress']
    const selectedProb = problems[Math.floor(Math.random() * problems.length)]
    const mockConf = (88 + Math.random() * 11).toFixed(1)
    addLog(`BUDDHI Diagnostic: Anomaly classified as [${selectedProb}] with ${mockConf}% confidence.`)
    addLog('Priority calculated: HIGH. Dispatching robot mission route request.')
    
    // Path Calculation
    await delay(1000)
    setPhase('routing')
    sound.playClick()
    const generatedPath = calculateAStarPath(START_ROBOT, selectedCell)
    if (generatedPath.length === 0) {
      addLog('Error: PROMETHIA calculated no reachable path (infinite cost grid).')
      setPhase('idle')
      return
    }
    setPath(generatedPath)
    addLog(`PROMETHIA path generated successfully: f(n) cost = ${generatedPath.length} steps. Manhattan heuristic active.`)
    
    // Robot Dispatching
    await delay(1200)
    setPhase('dispatching')
    addLog('Arduino Nano MCU online. Serial Bluetooth link (HC-05) synchronized. TALOS moving...')
    
    // Robot Stepping Animation loop
    for (let i = 0; i < generatedPath.length; i++) {
      await delay(600)
      const currentPos = generatedPath[i]
      setRobotPos(currentPos)
      sound.playClick()
      
      // Calculate mock distance to obstacles
      let closestObstacle = 100
      OBSTACLES.forEach(obs => {
        const [ox, oy] = obs.split(',').map(Number)
        const d = Math.abs(currentPos.x - ox) + Math.abs(currentPos.y - oy)
        if (d < closestObstacle) closestObstacle = d
      })
      setSonarDist(closestObstacle * 15 + Math.floor(Math.random() * 5))
      
      addLog(`TALOS navigating: Arrived at node (${currentPos.x}, ${currentPos.y}).`)
    }

    // Inspecting & Soil monitoring
    await delay(800)
    setPhase('inspecting')
    addLog('TALOS reached destination node. Deploying Capacitive Moisture Sensor v1.2...')
    
    const startingMoisture = 240 + Math.floor(Math.random() * 80)
    setMoisture(startingMoisture)
    addLog(`Capacitive sensor ADC read: ${startingMoisture} (< 350 Threshold). Low moisture verified.`)
    
    await delay(1000)
    addLog('IRF520 MOSFET pump trigger: Water solenoid pump ON...')
    sound.playPump()
    
    // Simulate moisture increase & water drop
    for (let currentADC = startingMoisture; currentADC <= 680; currentADC += 80) {
      await delay(400)
      setMoisture(Math.min(680, currentADC))
      setWaterLevel(w => Math.max(10, w - 3))
    }
    
    addLog('Capacitive sensor ADC read: 680 (> 650 Threshold). Target wetness achieved. Pump OFF.')
    
    // Success & ROI calculations
    await delay(1000)
    setPhase('success')
    sound.playSuccess()
    const cropValue = 35 + Math.floor(Math.random() * 15)
    setSavings(s => s + cropValue)
    addLog(`MERCATUS Audited: Diagnostic execution loop complete. Estimated crop loss prevented: +$${cropValue}.`)
    addLog(`Total water saved via targeted spot irrigation: +45 Liters.`)
    addLog(`Autonomous loop finished successfully. Docks ready for recharge.`);
  }

  // Reset sandbox state
  const handleReset = () => {
    sound.playClick()
    setSelectedCell(null)
    setPhase('idle')
    setRobotPos(START_ROBOT)
    setDronePos(START_DRONE)
    setPath([])
    setMoisture(650)
    setSonarDist(100)
    setWaterLevel(100)
    setLogs([
      'SYSTEM RESET: Awaiting coordinate targeting input...',
      'Base stations online. SiK telemetry sync: 100%'
    ])
  }

  const delay = (ms) => new Promise(res => setTimeout(res, ms))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-50 overflow-hidden bg-charcoal-950 text-white flex flex-col pt-[72px]"
    >
      {/* Top Banner */}
      <div className="flex justify-between items-center px-8 py-4 bg-charcoal-900/60 border-b border-white/5 relative z-20">
        <div className="flex items-center gap-3">
          <StatusBadge variant="active" pulse>
            SANDBOX MISSION CONTROL
          </StatusBadge>
          <span className="text-xs font-mono text-mist-500 uppercase tracking-widest hidden sm:inline">
            Interactive Presentation Loop
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMuted} 
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-mist-400 hover:text-white transition-all"
            title={muted ? "Unmute Sounds" : "Mute Sounds"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-mist-500/25 bg-charcoal-900/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-mist-300 hover:text-field-200"
          >
            <X size={12} /> Exit (Esc)
          </button>
        </div>
      </div>

      {/* Main Grid & HUD Panels */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_400px_420px] gap-6 p-6 overflow-hidden">
        
        {/* Panel 1: Interactive Sandbox Field */}
        <div className="flex flex-col bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[80px] pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display text-xl font-bold">Interactive Farm Matrix</h3>
              <p className="text-xs text-mist-400 font-light mt-1">Select any crop cell to trigger the detection-to-action pipeline.</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleReset} 
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-mist-400 hover:text-white transition-all"
                title="Reset Sandbox"
              >
                <RefreshCw size={14} />
              </button>
              <button 
                disabled={!selectedCell || (phase !== 'idle' && phase !== 'success')} 
                onClick={startMission}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCell && (phase === 'idle' || phase === 'success')
                    ? 'bg-gold-400 text-charcoal-950 hover:bg-gold-300 hover:scale-105 shadow-[0_0_15px_rgba(232,185,85,0.3)]'
                    : 'bg-white/5 text-mist-500 border border-white/5 cursor-not-allowed'
                }`}
              >
                <Play size={12} /> Launch
              </button>
            </div>
          </div>

          {/* Interactive Grid Map */}
          <div className="flex-grow flex items-center justify-center p-2">
            <div className="grid grid-cols-6 gap-2 bg-charcoal-900/60 p-4 rounded-3xl border border-white/10 shadow-2xl aspect-square w-full max-w-[420px]">
              {Array.from({ length: GRID_SIZE }).map((_, y) => (
                Array.from({ length: GRID_SIZE }).map((_, x) => {
                  const isObstacle = OBSTACLES.has(`${x},${y}`)
                  const isStartRobot = START_ROBOT.x === x && START_ROBOT.y === y
                  const isStartDrone = START_DRONE.x === x && START_DRONE.y === y
                  const isSelected = selectedCell?.x === x && selectedCell?.y === y
                  const isRobot = robotPos.x === x && robotPos.y === y
                  const isDrone = dronePos.x === x && dronePos.y === y
                  const inPath = path.some(p => p.x === x && p.y === y)

                  return (
                    <button
                      key={`${x},${y}`}
                      disabled={isObstacle || isStartRobot}
                      onClick={() => handleCellClick(x, y)}
                      className={`relative flex items-center justify-center border rounded-xl aspect-square transition-all ${
                        isObstacle 
                          ? 'bg-charcoal-950 border-white/5 text-mist-600 cursor-not-allowed shadow-inner' 
                          : isStartRobot
                          ? 'bg-field-500/10 border-field-500/30'
                          : isSelected
                          ? 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : inPath && phase === 'dispatching'
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {/* Grid Icons */}
                      {isObstacle && <span className="text-xs">🪨</span>}
                      {isStartRobot && !isRobot && <span className="text-[10px] font-mono text-field-400">DOCK</span>}
                      {isSelected && !isRobot && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <AlertTriangle className="text-red-400 animate-pulse" size={16} />
                          {phase === 'scanning' && (
                            <span className="absolute inset-0 bg-red-400/20 border-2 border-red-400 animate-ping rounded-xl" />
                          )}
                        </div>
                      )}

                      {/* Robot Visualizer */}
                      {isRobot && (
                        <motion.div 
                          layoutId="robot" 
                          className="absolute z-10 w-8 h-8 rounded-full bg-field-400 border border-field-300 flex items-center justify-center text-charcoal-950 shadow-[0_0_15px_rgba(95,184,126,0.6)]"
                        >
                          <Bot size={16} />
                        </motion.div>
                      )}

                      {/* Drone Scanning effect */}
                      {isDrone && phase === 'scanning' && (
                        <motion.div 
                          layoutId="drone" 
                          className="absolute z-20 w-8 h-8 rounded-full bg-sky-400/20 border border-sky-400 flex items-center justify-center text-sky-400 animate-pulse shadow-[0_0_20px_rgba(56,189,248,0.8)]"
                        >
                          <Radio size={14} className="animate-spin-slow" />
                        </motion.div>
                      )}

                      {/* Targeted Water Spray animation */}
                      {isRobot && phase === 'inspecting' && (
                        <span className="absolute inset-0 border-2 border-sky-400 bg-sky-500/10 rounded-xl animate-pulse flex items-center justify-center">
                          <Droplet size={14} className="text-sky-300 animate-bounce" />
                        </span>
                      )}

                      {/* Coordinates label */}
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono text-mist-600">
                        {x},{y}
                      </span>
                    </button>
                  )
                })
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Live Telemetry HUD */}
        <div className="flex flex-col bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-field-500/5 blur-[80px] pointer-events-none" />
          
          <h3 className="font-display text-xl font-bold mb-4">Diagnostics Telemetry</h3>
          
          {/* Diagnostic status points */}
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-mono text-mist-400 uppercase tracking-widest">Selected Target</span>
              <span className="text-sm font-mono text-white font-bold">{selectedCell ? `Grid cell (${selectedCell.x}, ${selectedCell.y})` : 'None'}</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-mono text-mist-400 uppercase tracking-widest">Active Phase</span>
              <span className="text-sm font-mono text-gold-400 font-bold uppercase tracking-widest">{phase}</span>
            </div>

            {/* Simulated hardware gauges */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-charcoal-900/60 p-4 rounded-2xl border border-white/5 text-center">
                <span className="text-xs font-mono text-mist-500 uppercase tracking-wider block mb-1">Moisture (VWC)</span>
                <span className={`text-2xl font-mono font-bold ${moisture < 350 ? 'text-red-400 animate-pulse' : 'text-field-400'}`}>
                  {moisture} <span className="text-xs text-mist-400">ADC</span>
                </span>
              </div>

              <div className="bg-charcoal-900/60 p-4 rounded-2xl border border-white/5 text-center">
                <span className="text-xs font-mono text-mist-500 uppercase tracking-wider block mb-1">Sonar Range</span>
                <span className={`text-2xl font-mono font-bold ${sonarDist < 30 ? 'text-orange-400' : 'text-sky-400'}`}>
                  {sonarDist} <span className="text-xs text-mist-400">cm</span>
                </span>
              </div>

              <div className="bg-charcoal-900/60 p-4 rounded-2xl border border-white/5 text-center">
                <span className="text-xs font-mono text-mist-500 uppercase tracking-wider block mb-1">Water Payload</span>
                <div className="w-full bg-charcoal-800 h-2 rounded-full overflow-hidden mt-2 border border-white/10">
                  <div className="bg-sky-400 h-full transition-all duration-300" style={{ width: `${waterLevel}%` }} />
                </div>
                <span className="text-xs font-mono text-sky-300 block mt-1">{waterLevel}% Remaining</span>
              </div>

              <div className="bg-charcoal-900/60 p-4 rounded-2xl border border-white/5 text-center">
                <span className="text-xs font-mono text-mist-500 uppercase tracking-wider block mb-1">MERCATUS ROI</span>
                <span className="text-2xl font-mono font-bold text-gold-400 block">
                  +${savings}
                </span>
                <span className="text-[10px] font-mono text-mist-500">Savings preserved</span>
              </div>
            </div>

            {/* Grid Route Cost visualizer */}
            <div className="mt-4 p-4 bg-charcoal-950/50 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-mist-500 uppercase tracking-wider block mb-2">Cost Matrix Cost Weights</span>
              <div className="flex gap-4 justify-between text-xs text-mist-300">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-mist-500" /> Soil (1.0)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Obstacle (∞)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-field-400" /> Path (Node)</div>
              </div>
            </div>

          </div>
        </div>

        {/* Panel 3: Live Terminal Logger */}
        <div className="flex flex-col bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[80px] pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <Terminal size={16} className="text-field-400 animate-pulse" />
            <h3 className="font-display text-lg font-bold">Execution Logs</h3>
          </div>
          
          {/* Scrollbox logs */}
          <div className="flex-grow overflow-y-auto bg-charcoal-950/90 border border-white/5 rounded-2xl p-4 font-mono text-[11px] text-field-300 space-y-2 h-[220px] scrollbar-none">
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed break-words font-light">
                <span className="text-mist-500">$ </span>{log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
          
          {/* Help box */}
          <div className="mt-4 p-4 bg-white/5 border border-white/5 rounded-2xl flex gap-3 items-center">
            <Activity size={18} className="text-gold-400 shrink-0" />
            <span className="text-[11px] text-mist-400 leading-relaxed font-light">
              This sandbox proves the A* algorithm avoiding obstacle nodes (`1,3`, `2,3`, `3,3`, `4,1`, `4,2`) and coordinating with BUDDHI YOLO and Arduino pump triggers dynamically.
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  )
}
