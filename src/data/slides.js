import Cover from '../slides/Cover.jsx'
import Problem from '../slides/Problem.jsx'
import Pegasus from '../slides/Pegasus.jsx'
import HumanOperator from '../slides/HumanOperator.jsx'
import Buddhi from '../slides/Buddhi.jsx'
import BuddhiDecisions from '../slides/BuddhiDecisions.jsx'
import Promethia from '../slides/Promethia.jsx'
import Talos from '../slides/Talos.jsx'
import TalosMission from '../slides/TalosMission.jsx'
import Sensors from '../slides/Sensors.jsx'
import SmartIrrigation from '../slides/SmartIrrigation.jsx'
import Mercatus from '../slides/Mercatus.jsx'
import MercatusLogistics from '../slides/MercatusLogistics.jsx'
import Final from '../slides/Final.jsx'

export const slides = [
  { id: 'cover', title: 'Cover', Component: Cover },
  { id: 'problem', title: 'Overview', Component: Problem },
  { id: 'pegasus', title: 'Pegasus', Component: Pegasus },
  { id: 'human-operator', title: 'Human Operator', Component: HumanOperator },
  { id: 'buddhi', title: 'Buddhi', Component: Buddhi },
  { id: 'buddhi-decisions', title: 'AI Decisions', Component: BuddhiDecisions },
  { id: 'promethia', title: 'Promethia', Component: Promethia },
  { id: 'talos', title: 'Talos', Component: Talos },
  { id: 'talos-mission', title: 'Robot Mission', Component: TalosMission },
  { id: 'sensors', title: 'Sensors', Component: Sensors },
  { id: 'smart-irrigation', title: 'Smart Irrigation', Component: SmartIrrigation },
  { id: 'mercatus', title: 'Mercatus', Component: Mercatus },
  { id: 'mercatus-logistics', title: 'Supply Chain', Component: MercatusLogistics },
  { id: 'final', title: 'Final', Component: Final },
]
