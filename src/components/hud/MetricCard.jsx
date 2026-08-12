const ACCENTS = {
  field: 'text-field-200',
  gold: 'text-gold-300',
  danger: 'text-red-300',
  mist: 'text-mist-100',
}

export default function MetricCard({ label, value, unit, accent = 'field', className = '' }) {
  return (
    <div className={`font-mono border-l-2 border-field-400/40 pl-3 py-1 ${className}`}>
      <div className="text-[10px] tracking-[0.2em] text-mist-500 uppercase">{label}</div>
      <div className={`text-xl font-semibold leading-tight ${ACCENTS[accent] || ACCENTS.field}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-mist-500">{unit}</span>}
      </div>
    </div>
  )
}
