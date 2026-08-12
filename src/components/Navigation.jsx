import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Navigation({ index, total, titles, onNext, onPrev, onGoTo }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 px-4 py-4 md:px-10 md:py-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={index === 0}
        className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-mist-500/20 bg-charcoal-900/70 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-mist-300 backdrop-blur transition hover:border-field-300/50 hover:text-field-200 disabled:pointer-events-none disabled:opacity-25 md:px-4 md:text-xs"
      >
        <ChevronLeft size={14} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="pointer-events-auto flex flex-1 flex-col items-center gap-2">
        <span className="font-mono text-[11px] tabular-nums text-mist-500 md:text-xs">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          <span className="ml-2 hidden text-mist-300 lg:inline">{titles[index]}</span>
        </span>
        <div className="flex max-w-[70vw] flex-wrap items-center justify-center gap-1.5">
          {titles.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => onGoTo(i)}
              aria-label={`Go to slide ${i + 1}: ${t}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-gold-400' : 'w-1.5 bg-mist-500/30 hover:bg-mist-500/60'
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={index === total - 1}
        className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-mist-500/20 bg-charcoal-900/70 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-mist-300 backdrop-blur transition hover:border-field-300/50 hover:text-field-200 disabled:pointer-events-none disabled:opacity-25 md:px-4 md:text-xs"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </div>
  )
}
