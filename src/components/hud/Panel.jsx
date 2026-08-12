export default function Panel({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-md border border-field-300/15 bg-charcoal-900/65 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
