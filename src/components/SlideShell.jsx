import SectionTitle from './hud/SectionTitle.jsx'

export default function SlideShell({ kicker, title, subtitle, align = 'left', background, children, className = '' }) {
  return (
    <div className={`relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-charcoal-950 px-6 pb-24 pt-12 md:px-14 md:pt-16 ${className}`}>
      {background}
      <div className="relative z-10 flex h-full w-full flex-col gap-6 md:gap-8">
        <SectionTitle kicker={kicker} title={title} subtitle={subtitle} align={align} />
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
