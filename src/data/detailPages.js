export const detailPages = {
  buddhi: {
    'ai-model': {
      title: "YOLOv8n Crop Disease Detection",
      subtitle: "Computer vision diagnostics at the edge",
      content: {
        purpose: "Acts as the real-time crop disease diagnostic engine, performing high-speed object detection on 640x640 frame inputs to output boundary boxes and classification vectors.",
        specs: [
          { label: "Model Architecture", value: "YOLOv8n (Nano) PyTorch model optimized for CPU inference" },
          { label: "Model Size", value: "~6.4 MB (3.2 Million parameters)" },
          { label: "Inference Latency", value: "~32ms on a standard laptop CPU" },
          { label: "Input Dimensions", value: "640 x 640 pixels (RGB)" }
        ],
        details: "The model runs as a localized API service on the ground station laptop. When PEGASUS transmits captured images via the 5GHz Wi-Fi link, the inference server runs the YOLO forward pass, detecting crop anomalies (Early Blight, Late Blight, Water Stress) and producing coordinate confidence scores."
      }
    },
    'priority-engine': {
      title: "Priority Decision Engine",
      subtitle: "Multi-factor task scheduler for robotic dispatch",
      content: {
        purpose: "Sorts multiple active crop detections to decide the optimal sequence of actions, ensuring high-risk diseases are mitigated before minor watering issues.",
        formula: "Score = 0.40(Severity) + 0.30(Urgency) + 0.15(Confidence) - 0.15(Distance_Norm)",
        weights: [
          { factor: "Severity (40%)", desc: "1 to 5 scale representing plant tissue destruction level." },
          { factor: "Urgency (30%)", desc: "Time-sensitivity of the disease spreading factor." },
          { factor: "Confidence (15%)", desc: "The AI model's detection probability score (0.0 to 1.0)." },
          { factor: "Distance (15%)", desc: "Normalized distance from the robot's current coordinates." }
        ],
        details: "By separating task priority from path planning, the priority engine ensures that the ground robot TALOS does not simply visit the closest zone first, but rather targets the most critical threat to crop yield."
      }
    },
    'dataset-pipeline': {
      title: "Training Dataset Pipeline",
      subtitle: "Augmentation and training metrics",
      content: {
        purpose: "Standardizes training workflows to ensure robustness under variable field lighting and camera angles.",
        metrics: [
          { label: "mAP50 Validation", value: "92.4%" },
          { label: "mAP50-95 Validation", value: "84.1%" },
          { label: "Total Augmented Dataset", value: "~5,000 leaf images" }
        ],
        details: "The training pipeline utilizes the public PlantVillage database combined with regional datasets. Augmentations applied include random horizontal/vertical flips, scale rotations, HSV color jitter (to simulate sunny vs overcast conditions), and mosaic batch mixing to help the model identify smaller disease spots."
      }
    }
  },
  pegasus: {
    'drone-hardware': {
      title: "Quadcopter Frame & Propulsion",
      subtitle: "Aerial grid survey hardware specifications",
      content: {
        purpose: "Autonomous flight hardware designed to execute pre-programmed waypoint grid surveys over crop fields.",
        specs: [
          { label: "Frame Class", value: "F450 Glass Fiber quadcopter frame" },
          { label: "Brushless Motors", value: "4 × 2212 920KV motors" },
          { label: "ESC & Propellers", value: "30A Electronic Speed Controllers, 1045 self-locking props" },
          { label: "Battery Spec", value: "4S 5200mAh 35C LiPo battery (18-20 minutes flight window)" }
        ],
        details: "The quadcopter operates at a 15m survey altitude. This altitude is optimal for balancing GSD resolution (Ground Sample Distance) and sensor coverage footprint, allowing 10 acres to be mapped in a single flight battery cycle."
      }
    },
    'comm-system': {
      title: "Dual-Band Communication System",
      subtitle: "Telemetry and payload transmission links",
      content: {
        purpose: "Maintains real-time connection between the drone flight controller, on-board payload camera, and ground station.",
        channels: [
          { link: "MAVLink Telemetry", hw: "SiK 915MHz Telemetry Radios", use: "Transmits real-time flight vectors, coordinates, and system health status to the Ground Control Station (GCS)." },
          { link: "Raw Frame Payload", hw: "5GHz Wi-Fi Access Point", use: "Syncs high-resolution crop images directly to the laptop running the BUDDHI API loop." }
        ],
        details: "The hybrid system ensures that safety-critical flight telemetry remains robust on the sub-GHz band, while high-bandwidth imaging data utilizes localized 5GHz channels."
      }
    },
    'grid-localization': {
      title: "Image-to-Grid Projection",
      subtitle: "Camera frame georeferencing math",
      content: {
        purpose: "Converts focal plane coordinate vectors from captured camera frames into discrete coordinates on the farm's coordinate grid map.",
        steps: [
          { step: "1. Capture Image", desc: "8MP image captured at waypoint via Raspberry Pi Cam v2 (Sony IMX219)." },
          { step: "2. GPS Projection", desc: "Integrates flight controller pitch, yaw, roll, and GPS coordinate metadata." },
          { step: "3. Matrix Offset", desc: "Translates GSD (Ground Sample Distance) vectors into metric distance offsets." },
          { step: "4. Node Resolution", desc: "Resolves coordinate to a target grid cell (e.g. B2) for the ground robot." }
        ],
        details: "Using this localization algorithm, we achieve an accuracy of ±0.3 meters on the grid, ensuring the ground robot navigates precisely to the infected plant."
      }
    }
  },
  talos: {
    'robot-hardware': {
      title: "Differential Ground Rover Specs",
      subtitle: "Autonomous agricultural ground vehicle",
      content: {
        purpose: "Navigates between row crops to execute ground-level validation, environmental sensing, and targeted spot-irrigation.",
        specs: [
          { label: "Main MCU", value: "Arduino Nano (ATmega328P) running custom C/C++ loops" },
          { label: "Chassis & Motors", value: "4WD acrylic chassis, 4 geared DC motors (differential steering)" },
          { label: "Motor Driver", value: "L298N dual H-bridge motor driver" },
          { label: "Irrigation Payload", value: "500ml water tank, 5V DC micro pump, IRF520 MOSFET driver, 1N4007 flyback diode" }
        ],
        details: "The ground rover receives target coordinates from PROMETHIA via a Bluetooth HC-05 serial link. Once received, it executes differential wheel controls to align and drive to the target node."
      }
    },
    'sonar-ranger': {
      title: "Obstacle Avoidance Sonar Math",
      subtitle: "Time-of-flight ultrasonic collision avoidance",
      content: {
        purpose: "Provides real-time obstacle detection to safeguard the robot from collision with crop stems, tools, or dynamic objects.",
        formula: "Distance (cm) = (Echo Time in µs × 0.0343) ÷ 2",
        details: "The Arduino triggers a 10µs HIGH pulse on the HC-SR04 Trigger pin. The sensor transmits an 8-cycle sonic burst. The Echo pin goes HIGH until the bounced wave is received. Distance is calculated by dividing by 2 (for the round-trip) and multiplying by the speed of sound at 20°C (0.0343 cm/µs). If distance is less than 15cm, the robot triggers an emergency stop."
      }
    },
    'moisture-monitoring': {
      title: "Capacitive Moisture Monitoring",
      subtitle: "Precision irrigation loop calibration",
      content: {
        purpose: "Uses capacitive soil frequency shifts to measure volumetric water content without probe corrosion.",
        calibration: [
          { cond: "Dry Threshold", value: "ADC Value < 350", action: "Trigger IRF520 MOSFET; start pump cycle" },
          { cond: "Wet Threshold", value: "ADC Value > 650", action: "De-trigger MOSFET; stop pump cycle" }
        ],
        details: "By utilizing a capacitive sensor (v1.2) rather than a resistive probe, the system prevents copper oxidation, ensuring calibration accuracy remains stable over multiple crop seasons."
      }
    }
  },
  promethia: {
    'pathfinding-astar': {
      title: "A* Pathfinding & Heuristics",
      subtitle: "Optimal route calculation through crop rows",
      content: {
        purpose: "Calculates the absolute shortest, lowest-cost pathway for the ground robot TALOS to navigate from its dock to the target zone.",
        formula: "f(n) = g(n) + h(n)",
        details: "A* evaluates grid nodes where g(n) is the exact cost from the start node, and h(n) is the heuristic estimate to the goal. Because a row crop farm is structured in grid lanes, we implement the Manhattan Distance Heuristic: h(n) = |x₂ − x₁| + |y₂ − y₁|. This prevents the algorithm from trying to evaluate diagonal pathing that would crash the robot into plant rows."
      }
    },
    'cost-grid-rerouting': {
      title: "Dynamic Grid Cost Weights",
      subtitle: "Path costing and real-time obstacle recalculation",
      content: {
        purpose: "Models field geography and soil conditions as mathematical cost multipliers to ensure the robot avoids high-risk paths.",
        weights: [
          { type: "Dry/Compact Soil", cost: "1.0 (Baseline)", effect: "Optimal traction, normal speed." },
          { type: "Wet Muddy Patch", cost: "3.5 (Slippage)", effect: "Slower wheel speed, high battery draw." },
          { type: "Rocky Terrain", cost: "5.0 (Vibration)", effect: "Avoid unless no other path exists." },
          { type: "Obstacle / Blocked Row", cost: "∞ (Blocked)", effect: "Pathfinding boundary." }
        ],
        details: "If the HC-SR04 sonar registers an obstacle, the robot updates its local cell cost to ∞ in memory. Promethia instantly recalculates a new route from the current coordinate to the target in under 15ms."
      }
    }
  },
  mercatus: {
    'feasibility-audit': {
      title: "Economic Feasibility Audit",
      subtitle: "Precision agriculture cost-benefit analysis",
      content: {
        purpose: "Proves the financial feasibility of AGROGUARD 360 by modeling investment cost against resource savings and crop yield preservation.",
        params: [
          { param: "Initial CAPEX", value: "~$1,500", desc: "Bill of materials for drone, robot, base station, and local server setup." },
          { param: "Water Conservation", value: "24% Reduction", desc: "Precision watering limits irrigation to dry disease-affected zones only." },
          { param: "Labor Savings", value: "80% Reduction", desc: "Replaces daily manual foot patrols with autonomous drone surveys." }
        ],
        details: "For a typical 5-acre high-value row crop farm, the system pays for itself in less than two harvest seasons by preventing systemic crop rot spread."
      }
    },
    'roi-math': {
      title: "ROI & Cost Formulas",
      subtitle: "Mathematical audit models",
      content: {
        purpose: "Formulas used by the MERCATUS analytics dashboard to calculate seasonal savings.",
        formulas: [
          { name: "Water Saved", eq: "Usage_Traditional - Usage_AgroGuard" },
          { name: "Labor Cost Saved", eq: "(Hours_Traditional × Wage) - (Hours_AgroGuard × Wage)" },
          { name: "Total Net Benefit", eq: "Total Savings - (Drone Opex + Robot Opex)" },
          { name: "Return on Investment", eq: "(Total Net Benefit ÷ Initial CAPEX) × 100" }
        ],
        details: "Telemetry logs from drone flight times and robot pump cycles are uploaded to the dashboard after each operation to generate real savings charts."
      }
    }
  },
  fiontar: {
    'customer-pipeline': {
      title: "Target Customers & Pilot Pipeline",
      subtitle: "Commercial product market fit",
      content: {
        purpose: "Establishes customer archetypes and value delivery streams for scaling the product.",
        targets: [
          { tier: "Small/Medium Farms", size: "10 - 50 acres", value: "Gives smallholders access to high-tech diagnostics without expensive equipment costs." },
          { tier: "Greenhouse Operations", size: "Controlled spans", value: "Perfect for high-density environments where disease spreads rapidly." },
          { tier: "Agricultural Cooperatives", size: "Shared machinery", value: "Enables shared deployment of the hardware bundle across multiple farms." }
        ],
        details: "Pilot operations are targeted towards greenhouse tomato growers where early blight detection can save up to 40% of seasonal yield loss."
      }
    },
    'business-models': {
      title: "Monetization & SaaS Tiers",
      subtitle: "HaaS, SaaS, and MaaS revenue streams",
      content: {
        purpose: "Flexible pricing models designed around how different farm scales operate financially.",
        models: [
          { name: "1. Hardware CAPEX Bundle", pricing: "$2,499 one-time", desc: "Quadcopter + Ground Rover + Docking Station + local server install." },
          { name: "2. SaaS AI Diagnostics", pricing: "$19 - $49/acre/mo", desc: "Access to the YOLO cloud diagnostics portal, reports, and path planners." },
          { name: "3. Monitoring-as-a-Service", pricing: "$150/acre/season", desc: "Full leasing model: zero upfront hardware cost, seasonal analytics reports." }
        ],
        details: "The HaaS (Hardware-as-a-Service) leasing model lowers the barrier of entry, letting farmers pilot the technology with zero capital risk."
      }
    }
  }
};
