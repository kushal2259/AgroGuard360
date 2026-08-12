export const PROBLEMS = [
  {
    id: 'disease',
    icon: 'Leaf',
    title: 'Crop Disease',
    body: 'Fungal and bacterial infections spread through a field long before visible symptoms reach the naked eye.',
  },
  {
    id: 'pest',
    icon: 'Bug',
    title: 'Pest Damage',
    body: 'Localized infestations go unnoticed until they have already spread across entire crop rows.',
  },
  {
    id: 'water',
    icon: 'Droplets',
    title: 'Water Stress',
    body: 'Under- and over-irrigated zones sit side by side, invisible from the ground until yield is already lost.',
  },
  {
    id: 'manual',
    icon: 'Eye',
    title: 'Manual Inspection',
    body: 'Walking a large farm by hand is slow, inconsistent, and only ever covers a fraction of the field.',
  },
  {
    id: 'financial',
    icon: 'IndianRupee',
    title: 'Financial Uncertainty',
    body: 'Without early warning, losses are only discovered at harvest — when nothing can be done about them.',
  },
]

export const SOLUTION_COMPONENTS = [
  { id: 'drone', icon: 'Plane', label: 'Drone', action: 'Observe', desc: 'Aerial survey of the full field' },
  { id: 'ai', icon: 'BrainCircuit', label: 'AI', action: 'Understand', desc: 'Detects anomalies in imagery' },
  { id: 'robot', icon: 'Bot', label: 'Robot', action: 'Inspect', desc: 'Ground-level close inspection' },
  { id: 'sensors', icon: 'Radio', label: 'Sensors', action: 'Measure', desc: 'Soil & climate data capture' },
  { id: 'analytics', icon: 'LineChart', label: 'Analytics', action: 'Decide', desc: 'Turns data into action' },
]

export const PIPELINE_STAGES = [
  { id: 'drone', icon: 'Plane', label: 'Drone', detail: 'Scans field from above' },
  { id: 'ai', icon: 'BrainCircuit', label: 'AI', detail: 'Detects abnormal crop signature' },
  { id: 'robot', icon: 'Bot', label: 'Robot', detail: 'Moves to flagged location' },
  { id: 'sensors', icon: 'Radio', label: 'Sensors', detail: 'Collects ground-truth data' },
  { id: 'recommendation', icon: 'ClipboardCheck', label: 'Recommendation', detail: 'System proposes an action' },
  { id: 'farmer', icon: 'User', label: 'Farmer', detail: 'Receives a clear decision' },
]

export const VIRTUAL_FARM_ZONES = [
  {
    id: 'disease',
    label: 'Disease',
    x: 26,
    y: 30,
    metric: { label: 'Disease Risk', value: 'LOW', tone: 'field' },
    detail: 'Leaf-level scans show no active infection signatures in this block.',
  },
  {
    id: 'pest',
    label: 'Pest',
    x: 68,
    y: 22,
    metric: { label: 'Pest Risk', value: 'MEDIUM', tone: 'gold' },
    detail: 'Early aphid clustering detected along the eastern row edge.',
  },
  {
    id: 'water',
    label: 'Water Stress',
    x: 82,
    y: 55,
    metric: { label: 'Water Stress', value: 'HIGH', tone: 'danger' },
    detail: 'Canopy temperature 4.2°C above baseline — irrigation underperforming.',
  },
  {
    id: 'soil',
    label: 'Soil',
    x: 20,
    y: 68,
    metric: { label: 'Soil Moisture', value: '41%', tone: 'field' },
    detail: 'Moisture trending downward over the last 48 hours.',
  },
  {
    id: 'health',
    label: 'Crop Health',
    x: 50,
    y: 45,
    metric: { label: 'Crop Health', value: '82%', tone: 'field' },
    detail: 'Overall vigor index remains strong across the central block.',
  },
  {
    id: 'market',
    label: 'Market',
    x: 60,
    y: 78,
    metric: { label: 'Market Signal', value: 'HOLD', tone: 'gold' },
    detail: 'Current price trend favors holding this harvest for 5-7 days.',
  },
]

export const TECHVERSE_MODULES = [
  { id: 'buddhi', icon: 'BrainCircuit', name: 'BUDDHI', tagline: 'AI Intelligence', desc: 'Computer-vision crop analysis engine.' },
  { id: 'fiontar', icon: 'Lightbulb', name: 'FIONTAR', tagline: 'Business Intelligence', desc: 'Translates farm data into financial impact.' },
  { id: 'talos', icon: 'Bot', name: 'TALOS', tagline: 'Autonomous Robotics', desc: 'Ground robot inspection & sampling.' },
  { id: 'pegasus', icon: 'Plane', name: 'PEGASUS', tagline: 'Aerial Intelligence', desc: 'Drone-based field survey system.' },
  { id: 'promethia', icon: 'Flame', name: 'PROMETHIA', tagline: 'Predictive Intelligence', desc: 'Forecasts risk before it becomes damage.' },
  { id: 'mercatus', icon: 'TrendingUp', name: 'MERCATUS', tagline: 'Market Intelligence', desc: 'Live crop price & demand signals.' },
]

export const REVENUE_STREAMS = [
  { id: 'subscription', icon: 'Repeat', title: 'Subscription', desc: 'Monthly / annual platform access plans.' },
  { id: 'per-acre', icon: 'Ruler', title: 'Per-Acre Monitoring', desc: 'Priced according to total farm area covered.' },
  { id: 'drone', icon: 'Plane', title: 'Drone Inspection', desc: 'On-demand aerial inspection call-outs.' },
  { id: 'robot', icon: 'Bot', title: 'Robot Inspection', desc: 'Ground-level autonomous inspection visits.' },
  { id: 'enterprise', icon: 'Building2', title: 'Enterprise Plans', desc: 'Custom contracts for large farms & agribusiness.' },
]

export const ROADMAP_STAGES = [
  { id: 'virtual', icon: 'MonitorPlay', title: 'Virtual Prototype', desc: 'Full software simulation — where we are today.' },
  { id: 'esp32', icon: 'Cpu', title: 'ESP32', desc: 'Low-power microcontroller for field-node prototyping.' },
  { id: 'pi', icon: 'CircuitBoard', title: 'Raspberry Pi', desc: 'On-device compute for vision & sensor fusion.' },
  { id: 'sensors', icon: 'Radio', title: 'Real Sensors', desc: 'Physical soil moisture, temperature & humidity nodes.' },
  { id: 'drone', icon: 'Plane', title: 'Real Drone', desc: 'Hardware aerial platform running Pegasus.' },
  { id: 'agrobot', icon: 'Bot', title: 'Autonomous AgroBot', desc: 'Full ground robot deployed under Talos.' },
]

export const TARGET_USERS = [
  { id: 'farmers', icon: 'User', label: 'Individual Farmers' },
  { id: 'large-farms', icon: 'Warehouse', label: 'Large Agricultural Farms' },
  { id: 'cooperatives', icon: 'Users', label: 'Agricultural Cooperatives' },
  { id: 'agribusiness', icon: 'Building2', label: 'Agri-Businesses' },
  { id: 'greenhouse', icon: 'Sprout', label: 'Greenhouses' },
  { id: 'enterprise', icon: 'Factory', label: 'Agricultural Enterprises' },
]

export const VALUE_POINTS = [
  'Detect problems earlier, before visible damage spreads',
  'Reduce crop loss from disease, pests, and water stress',
  'Cut unnecessary pesticide use through targeted treatment',
  'Optimize irrigation scheduling with real soil data',
  'Reduce hours spent on manual field walks',
  'Make faster, better-informed farm decisions',
]

export const FINANCIAL_IMPACT = {
  withoutSystem: 50000,
  withSystem: 38000,
  currency: '₹',
}

export const MARKET_DATA = {
  crop: 'TOMATO',
  price: 28,
  currency: '₹',
  unit: '/kg',
  trend7d: 8.4,
  demand: 'STRONG',
  recommendation: 'HOLD',
  series: [22, 23, 21, 24, 26, 25, 27, 28],
}

export const LIVE_DEMO_PHASES = [
  {
    id: 'pegasus',
    phase: '01',
    label: 'PEGASUS',
    title: 'Drone launches and begins aerial survey',
    icon: 'Plane',
  },
  {
    id: 'buddhi',
    phase: '02',
    label: 'BUDDHI',
    title: 'AI receives imagery — crop anomaly detected',
    icon: 'BrainCircuit',
    metric: { label: 'Confidence', value: '94.7%' },
  },
  {
    id: 'talos',
    phase: '03',
    label: 'TALOS',
    title: 'Robot plans a route and moves through crop rows',
    icon: 'Bot',
  },
  {
    id: 'sensors',
    phase: '04',
    label: 'SENSORS',
    title: 'Robot reaches target — ground data collected',
    icon: 'Radio',
  },
  {
    id: 'recommendation',
    phase: '05',
    label: 'AI RECOMMENDATION',
    title: 'Aerial and ground data combined into a decision',
    icon: 'ClipboardCheck',
    stats: [
      { label: 'Disease Risk', value: 'HIGH', tone: 'danger' },
      { label: 'Water Stress', value: 'MEDIUM', tone: 'gold' },
    ],
    action: 'INSPECT + TREAT',
  },
  {
    id: 'fiontar',
    phase: '06',
    label: 'FIONTAR',
    title: 'Estimated financial impact calculated',
    icon: 'Lightbulb',
  },
  {
    id: 'mercatus',
    phase: '07',
    label: 'MERCATUS',
    title: 'Market trend checked before final decision',
    icon: 'TrendingUp',
    action: 'HOLD',
  },
]
