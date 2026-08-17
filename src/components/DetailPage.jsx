import { motion } from 'framer-motion'
import { X, Cpu, Settings, Activity, AlertTriangle, ArrowRight, ShieldCheck, FileText } from 'lucide-react'
import { detailPages } from '../data/detailPages.js'

export default function DetailPage({ moduleId, sectionId, onClose }) {
  const moduleData = detailPages[moduleId]
  if (!moduleData) return null
  const page = moduleData[sectionId]
  if (!page) return null

  const { title, subtitle, content } = page

  const iconMap = {
    buddhi: <Cpu className="text-gold-400" size={24} />,
    pegasus: <Settings className="text-sky-400" size={24} />,
    talos: <Activity className="text-field-400" size={24} />,
    promethia: <ArrowRight className="text-emerald-400" size={24} />,
    mercatus: <FileText className="text-amber-400" size={24} />,
    fiontar: <ShieldCheck className="text-purple-400" size={24} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-950/95 backdrop-blur-2xl p-4 md:p-8"
    >
      {/* High-tech border container */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-5xl h-[85vh] bg-charcoal-900/60 border border-white/10 rounded-[2.5rem] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Dynamic ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-field-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {iconMap[moduleId] || <Cpu size={24} />}
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">{moduleId} module</span>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight">{title}</h2>
              {subtitle && <p className="text-sm text-gold-400 font-mono tracking-wide">{subtitle}</p>}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-mist-400 hover:text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 relative z-10 scrollbar-none">
          
          {/* Section: Purpose */}
          {content.purpose && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-400" />
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-3">Core Objective</h4>
              <p className="text-lg md:text-xl text-mist-200 font-light leading-relaxed">{content.purpose}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Custom Lists depending on the section data structure */}
            
            {/* Specs list */}
            {content.specs && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Technical Specifications</h4>
                <div className="space-y-4">
                  {content.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-xs font-mono text-mist-500 uppercase tracking-wider mb-1">{spec.label}</span>
                      <span className="text-sm font-semibold text-mist-200">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weights list */}
            {content.weights && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Friction/Evaluation Weights</h4>
                <div className="space-y-4">
                  {content.weights.map((w, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-mono text-gold-400 font-bold">{w.factor || w.type}</span>
                        {w.cost && <span className="text-xs font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded">{w.cost}</span>}
                      </div>
                      <span className="text-sm text-mist-300 font-light">{w.desc || w.effect}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps list */}
            {content.steps && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Process Stages</h4>
                <div className="space-y-4">
                  {content.steps.map((st, i) => (
                    <div key={i} className="flex gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-field-500/10 border border-field-500/30 flex items-center justify-center text-field-400 font-mono text-xs font-bold shrink-0">
                        {i+1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-mono text-mist-200 font-bold">{st.step}</span>
                        <span className="text-xs text-mist-400">{st.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Channels list */}
            {content.channels && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Link Frequencies & Transceivers</h4>
                <div className="space-y-4">
                  {content.channels.map((ch, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-mono text-field-300 font-bold mb-0.5">{ch.link}</span>
                      <span className="text-xs text-mist-500 font-mono mb-2">{ch.hw}</span>
                      <span className="text-xs text-mist-300">{ch.use}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calibration details */}
            {content.calibration && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Calibration Profiles</h4>
                <div className="space-y-4">
                  {content.calibration.map((cal, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-mono text-mist-200 font-bold mb-1">{cal.cond}</span>
                      <div className="flex justify-between text-xs text-mist-400 font-mono bg-black/20 p-2 rounded">
                        <span>Trigger value: {cal.value}</span>
                        <span className="text-gold-400">Action: {cal.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics block */}
            {content.metrics && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Validation Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {content.metrics.map((met, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                      <span className="text-2xl md:text-3xl font-display font-semibold text-gold-400 block mb-1">{met.value}</span>
                      <span className="text-[10px] font-mono text-mist-500 uppercase tracking-widest">{met.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Targets list */}
            {content.targets && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Target Segments</h4>
                <div className="space-y-4">
                  {content.targets.map((tg, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-mono text-field-300 font-bold">{tg.tier}</span>
                        <span className="text-[10px] font-mono text-mist-400 bg-white/5 px-2 py-0.5 rounded">{tg.size}</span>
                      </div>
                      <span className="text-xs text-mist-300 leading-relaxed">{tg.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Models/Pricing list */}
            {content.models && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Monetization Models</h4>
                <div className="space-y-4">
                  {content.models.map((m, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-mist-100">{m.name}</span>
                        <span className="text-xs font-mono text-gold-400 bg-gold-400/10 px-2.5 py-0.5 rounded-full font-bold">{m.pricing}</span>
                      </div>
                      <span className="text-xs text-mist-400 leading-relaxed">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right block: Formulas or Formula List */}
            {content.formula && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center backdrop-blur-md relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-red-500/5 blur-[30px]" />
                <AlertTriangle className="text-red-400 mb-3" size={32} />
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-4">Core Calculation Formula</h4>
                <div className="font-mono text-lg md:text-xl text-gold-300 bg-black/30 border border-white/10 rounded-2xl px-6 py-4 drop-shadow-md leading-relaxed select-all">
                  {content.formula}
                </div>
              </div>
            )}

            {/* Financial Formulas list */}
            {content.formulas && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-6">Dashboard Financial Calculations</h4>
                <div className="space-y-4">
                  {content.formulas.map((f, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-xs font-mono text-mist-500 uppercase tracking-wider mb-1">{f.name}</span>
                      <span className="font-mono text-sm text-gold-300 bg-black/20 p-2 rounded border border-white/5">{f.eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General detail paragraph */}
            {content.details && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-mist-400 mb-4">Technical Context</h4>
                <p className="text-sm leading-relaxed text-mist-300 font-light">{content.details}</p>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between bg-black/10 relative z-10">
          <span className="text-[10px] font-mono text-mist-500 uppercase tracking-[0.2em]">AGROGUARD 360 platform</span>
          <span className="text-[10px] font-mono text-field-400 uppercase tracking-[0.2em]">System Diagnostics Online</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
